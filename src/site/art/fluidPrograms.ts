/* eslint-disable max-lines-per-function -- Shader declarations are kept beside their named GPU programs. */
/**
 * Builds the GPU programs for Amanda Ghassaei's MIT-licensed GPU-IO fluid
 * simulation method. Advection, divergence, Jacobi pressure solving, gradient
 * subtraction, and Lagrangian particle trails are retained. A low-amplitude
 * autonomous current replaces the original visible pointer controls.
 */
import { FLOAT, GPUProgram, INT, type GPUComposer } from 'gpu-io';

export interface FluidPrograms {
  advection: GPUProgram;
  drive: GPUProgram;
  divergence: GPUProgram;
  jacobi: GPUProgram;
  subtractGradient: GPUProgram;
  advectParticles: GPUProgram;
  renderParticles: GPUProgram;
  fadeTrails: GPUProgram;
  renderTrails: GPUProgram;
}

export function createFluidPrograms(
  composer: GPUComposer,
  width: number,
  height: number,
): FluidPrograms {
  const advection = new GPUProgram(composer, {
    name: 'velocityAdvection',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_state;
      uniform sampler2D u_velocity;
      uniform vec2 u_dimensions;
      out vec2 out_state;
      void main() {
        out_state = texture(u_state, v_uv - texture(u_velocity, v_uv).xy / u_dimensions).xy * 0.998;
      }`,
    uniforms: [
      { name: 'u_state', value: 0, type: INT },
      { name: 'u_velocity', value: 1, type: INT },
      { name: 'u_dimensions', value: [width, height], type: FLOAT },
    ],
  });

  const drive = new GPUProgram(composer, {
    name: 'livingCurrent',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_velocity;
      uniform float u_time;
      out vec2 out_velocity;
      void main() {
        vec2 velocity = texture(u_velocity, v_uv).xy;
        vec2 centered = v_uv * 2.0 - 1.0;
        float firstWave = sin(centered.y * 5.4 + u_time * 0.17);
        float secondWave = cos(centered.x * 4.2 - u_time * 0.13);
        vec2 current = vec2(firstWave + centered.y * 0.35, secondWave - centered.x * 0.35);
        out_velocity = clamp(velocity + current * 0.018, vec2(-22.0), vec2(22.0));
      }`,
    uniforms: [
      { name: 'u_velocity', value: 0, type: INT },
      { name: 'u_time', value: 0, type: FLOAT },
    ],
  });

  const divergence = new GPUProgram(composer, {
    name: 'divergence',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_vectorField;
      uniform vec2 u_pixelSize;
      out float out_divergence;
      void main() {
        float north = texture(u_vectorField, v_uv + vec2(0, u_pixelSize.y)).y;
        float south = texture(u_vectorField, v_uv - vec2(0, u_pixelSize.y)).y;
        float east = texture(u_vectorField, v_uv + vec2(u_pixelSize.x, 0)).x;
        float west = texture(u_vectorField, v_uv - vec2(u_pixelSize.x, 0)).x;
        out_divergence = 0.5 * (east - west + north - south);
      }`,
    uniforms: [
      { name: 'u_vectorField', value: 0, type: INT },
      { name: 'u_pixelSize', value: [1, 1], type: FLOAT },
    ],
  });

  const jacobi = new GPUProgram(composer, {
    name: 'pressureJacobi',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_pressure;
      uniform sampler2D u_divergence;
      uniform vec2 u_pixelSize;
      out float out_pressure;
      void main() {
        float north = texture(u_pressure, v_uv + vec2(0, u_pixelSize.y)).r;
        float south = texture(u_pressure, v_uv - vec2(0, u_pixelSize.y)).r;
        float east = texture(u_pressure, v_uv + vec2(u_pixelSize.x, 0)).r;
        float west = texture(u_pressure, v_uv - vec2(u_pixelSize.x, 0)).r;
        float divergenceValue = texture(u_divergence, v_uv).r;
        out_pressure = (north + south + east + west - divergenceValue) * 0.25;
      }`,
    uniforms: [
      { name: 'u_pressure', value: 0, type: INT },
      { name: 'u_divergence', value: 1, type: INT },
      { name: 'u_pixelSize', value: [1, 1], type: FLOAT },
    ],
  });

  const subtractGradient = new GPUProgram(composer, {
    name: 'subtractPressureGradient',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_pressure;
      uniform sampler2D u_velocity;
      uniform vec2 u_pixelSize;
      out vec2 out_velocity;
      void main() {
        float north = texture(u_pressure, v_uv + vec2(0, u_pixelSize.y)).r;
        float south = texture(u_pressure, v_uv - vec2(0, u_pixelSize.y)).r;
        float east = texture(u_pressure, v_uv + vec2(u_pixelSize.x, 0)).r;
        float west = texture(u_pressure, v_uv - vec2(u_pixelSize.x, 0)).r;
        out_velocity = texture(u_velocity, v_uv).xy - 0.5 * vec2(east - west, north - south);
      }`,
    uniforms: [
      { name: 'u_pressure', value: 0, type: INT },
      { name: 'u_velocity', value: 1, type: INT },
      { name: 'u_pixelSize', value: [1, 1], type: FLOAT },
    ],
  });

  const advectParticles = new GPUProgram(composer, {
    name: 'advectParticles',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_positions;
      uniform sampler2D u_velocity;
      uniform vec2 u_dimensions;
      out vec2 out_position;
      void main() {
        vec2 position = texture(u_positions, v_uv).xy;
        vec2 pixelSize = 1.0 / u_dimensions;
        vec2 firstVelocity = texture(u_velocity, position * pixelSize).xy;
        vec2 midpoint = position + firstVelocity * 0.25;
        vec2 secondVelocity = texture(u_velocity, midpoint * pixelSize).xy;
        out_position = mod(position + secondVelocity * 0.5 + u_dimensions, u_dimensions);
      }`,
    uniforms: [
      { name: 'u_positions', value: 0, type: INT },
      { name: 'u_velocity', value: 1, type: INT },
      { name: 'u_dimensions', value: [width, height], type: FLOAT },
    ],
  });

  const renderParticles = new GPUProgram(composer, {
    name: 'renderParticles',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_velocity;
      out float out_trail;
      void main() {
        vec2 velocity = texture(u_velocity, v_uv).xy;
        out_trail = clamp(0.34 + length(velocity) * 0.045, 0.32, 0.92);
      }`,
    uniforms: [{ name: 'u_velocity', value: 0, type: INT }],
  });

  const fadeTrails = new GPUProgram(composer, {
    name: 'fadeTrails',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_trails;
      out float out_trail;
      void main() { out_trail = max(texture(u_trails, v_uv).x - 0.018, 0.0); }`,
    uniforms: [{ name: 'u_trails', value: 0, type: INT }],
  });

  const renderTrails = new GPUProgram(composer, {
    name: 'renderTrails',
    fragmentShader: `
      in vec2 v_uv;
      uniform sampler2D u_trails;
      out vec4 out_color;
      void main() {
        float trail = texture(u_trails, v_uv).x;
        vec3 deep = vec3(0.018, 0.055, 0.14);
        vec3 middle = vec3(0.01, 0.28, 0.39);
        vec3 light = vec3(0.25, 0.92, 0.76);
        vec3 water = mix(deep, middle, smoothstep(0.0, 1.0, v_uv.y));
        vec3 color = mix(water, light, trail * 0.72);
        out_color = vec4(color, 1.0);
      }`,
    uniforms: [{ name: 'u_trails', value: 0, type: INT }],
  });

  return {
    advection,
    drive,
    divergence,
    jacobi,
    subtractGradient,
    advectParticles,
    renderParticles,
    fadeTrails,
    renderTrails,
  };
}
