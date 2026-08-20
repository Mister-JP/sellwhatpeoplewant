/* eslint-disable max-lines-per-function -- The fluid solver lifecycle is intentionally owned and disposed as one unit. */
/**
 * Hosts the GPU-IO incompressible-fluid system for the deep learning chapter.
 * Its solver and particle trails are isolated from the Three.js research world, paused
 * offscreen, capped by device class, and replaced by a composed static ocean when
 * WebGL or motion is unavailable.
 */
import { useEffect, useRef, type ReactElement } from 'react';
import { FLOAT, GPUComposer, GPULayer, LINEAR, NEAREST, REPEAT } from 'gpu-io';
import { createFluidPrograms } from './fluidPrograms';
import { useCalmCanvas } from './useCalmCanvas';

const velocityScale = 9;

function buildPositions(
  width: number,
  height: number,
  particleCount: number,
): Float32Array {
  const positions = new Float32Array(particleCount * 2);
  for (let particleIndex = 0; particleIndex < particleCount; particleIndex += 1) {
    positions[particleIndex * 2] = Math.random() * width;
    positions[particleIndex * 2 + 1] = Math.random() * height;
  }
  return positions;
}

export function FluidCurrentCanvas(): ReactElement {
  const containerReference = useRef<HTMLDivElement>(null);
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const animationAllowedReference = useRef(false);
  const { isAnimationAllowed, prefersReducedMotion } =
    useCalmCanvas(containerReference);

  useEffect(() => {
    animationAllowedReference.current = isAnimationAllowed;
  }, [isAnimationAllowed]);

  useEffect(() => {
    const container = containerReference.current;
    const canvas = canvasReference.current;
    if (container === null || canvas === null || prefersReducedMotion) return;

    let composer: GPUComposer;
    try {
      composer = new GPUComposer({ canvas });
    } catch {
      container.dataset.renderState = 'fallback';
      return;
    }

    const initialRect = container.getBoundingClientRect();
    let width = Math.max(Math.round(initialRect.width), 320);
    let height = Math.max(Math.round(initialRect.height), 560);
    const mobileDevice =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 720px)').matches;
    const maximumParticles = mobileDevice ? 28_000 : 72_000;
    const particleDensity = mobileDevice ? 0.035 : 0.065;
    let particleCount = Math.min(
      Math.ceil(width * height * particleDensity),
      maximumParticles,
    );
    const velocityDimensions: [number, number] = [
      Math.ceil(width / velocityScale),
      Math.ceil(height / velocityScale),
    ];

    const velocity = new GPULayer(composer, {
      name: 'velocity',
      dimensions: velocityDimensions,
      type: FLOAT,
      filter: LINEAR,
      numComponents: 2,
      wrapX: REPEAT,
      wrapY: REPEAT,
      numBuffers: 2,
    });
    const divergence = new GPULayer(composer, {
      name: 'divergence',
      dimensions: velocityDimensions,
      type: FLOAT,
      filter: NEAREST,
      numComponents: 1,
      wrapX: REPEAT,
      wrapY: REPEAT,
    });
    const pressure = new GPULayer(composer, {
      name: 'pressure',
      dimensions: velocityDimensions,
      type: FLOAT,
      filter: NEAREST,
      numComponents: 1,
      wrapX: REPEAT,
      wrapY: REPEAT,
      numBuffers: 2,
    });
    const positions = new GPULayer(composer, {
      name: 'particlePositions',
      dimensions: particleCount,
      type: FLOAT,
      numComponents: 2,
      numBuffers: 2,
      array: buildPositions(width, height, particleCount),
    });
    const trails = new GPULayer(composer, {
      name: 'particleTrails',
      dimensions: [width, height],
      type: FLOAT,
      filter: NEAREST,
      numComponents: 1,
      numBuffers: 2,
    });
    const programs = createFluidPrograms(composer, width, height);
    const updatePixelSize = (): void => {
      const pixelSize = [1 / velocity.width, 1 / velocity.height];
      programs.divergence.setUniform('u_pixelSize', pixelSize);
      programs.jacobi.setUniform('u_pixelSize', pixelSize);
      programs.subtractGradient.setUniform('u_pixelSize', pixelSize);
    };

    const resize = (): void => {
      const rect = container.getBoundingClientRect();
      const nextWidth = Math.max(Math.round(rect.width), 320);
      const nextHeight = Math.max(Math.round(rect.height), 560);
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      composer.resize([width, height]);
      velocity.resize([
        Math.ceil(width / velocityScale),
        Math.ceil(height / velocityScale),
      ]);
      divergence.resize([velocity.width, velocity.height]);
      pressure.resize([velocity.width, velocity.height]);
      trails.resize([width, height]);
      particleCount = Math.min(
        Math.ceil(width * height * particleDensity),
        maximumParticles,
      );
      positions.resize(particleCount, buildPositions(width, height, particleCount));
      programs.advection.setUniform('u_dimensions', [width, height]);
      programs.advectParticles.setUniform('u_dimensions', [width, height]);
      updatePixelSize();
    };
    composer.resize([width, height]);
    updatePixelSize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let animationFrame = 0;
    const renderFrame = (timeMilliseconds: number): void => {
      animationFrame = window.requestAnimationFrame(renderFrame);
      if (!animationAllowedReference.current) return;
      programs.drive.setUniform('u_time', timeMilliseconds / 1000);
      composer.step({
        program: programs.advection,
        input: [velocity, velocity],
        output: velocity,
      });
      composer.step({ program: programs.drive, input: velocity, output: velocity });
      composer.step({
        program: programs.divergence,
        input: velocity,
        output: divergence,
      });
      for (let pressureStep = 0; pressureStep < 4; pressureStep += 1) {
        composer.step({
          program: programs.jacobi,
          input: [pressure, divergence],
          output: pressure,
        });
      }
      composer.step({
        program: programs.subtractGradient,
        input: [pressure, velocity],
        output: velocity,
      });
      composer.step({ program: programs.fadeTrails, input: trails, output: trails });
      for (let trailStep = 0; trailStep < 2; trailStep += 1) {
        composer.step({
          program: programs.advectParticles,
          input: [positions, velocity],
          output: positions,
        });
        composer.drawLayerAsPoints({
          layer: positions,
          program: programs.renderParticles,
          input: velocity,
          output: trails,
          wrapX: true,
          wrapY: true,
        });
      }
      composer.step({ program: programs.renderTrails, input: trails });
    };
    animationFrame = window.requestAnimationFrame(renderFrame);
    container.dataset.renderState = 'live';

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      const allPrograms = [
        programs.advection,
        programs.drive,
        programs.divergence,
        programs.jacobi,
        programs.subtractGradient,
        programs.advectParticles,
        programs.renderParticles,
        programs.fadeTrails,
        programs.renderTrails,
      ];
      allPrograms.forEach((program): void => {
        program.dispose();
      });
      [velocity, divergence, pressure, positions, trails].forEach((layer): void => {
        layer.dispose();
      });
      composer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="fluid-art" ref={containerReference} aria-hidden="true">
      <div className="fluid-static-fallback" />
      <canvas ref={canvasReference} />
    </div>
  );
}
