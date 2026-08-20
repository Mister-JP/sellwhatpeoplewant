/**
 * Owns the scroll-driven Three.js research world for the first chapter. It has no
 * pointer interaction and no semantic claims; reduced motion, missing WebGL, or a
 * lost context keeps the checked-in static artwork instead of retrying the GPU.
 */
/* eslint-disable max-lines-per-function -- One effect owns one renderer lifecycle and its exact cleanup. */
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { useCalmCanvas } from '../useCalmCanvas';
import { buildResearchWorldScene } from './buildResearchWorldScene';
import { placeResearchWorldCamera } from './researchWorldCamera';
import { researchChapterIsVisible } from './researchWorldVisibility';

export function ResearchWorldBackdrop(): ReactElement {
  const hostReference = useRef<HTMLDivElement>(null);
  const [hasRenderFailure, setHasRenderFailure] = useState(false);
  const [isChapterActive, setIsChapterActive] = useState(true);
  const { isAnimationAllowed, prefersReducedMotion } = useCalmCanvas(hostReference);

  useEffect(() => {
    const hostElement = hostReference.current;
    const chapterElement = hostElement?.parentElement;
    if (!chapterElement) return;
    const updateChapterVisibility = (): void => {
      const chapterBounds = chapterElement.getBoundingClientRect();
      setIsChapterActive(researchChapterIsVisible(chapterBounds, window.innerHeight));
    };
    updateChapterVisibility();
    window.addEventListener('resize', updateChapterVisibility);
    window.addEventListener('scroll', updateChapterVisibility, { passive: true });
    return () => {
      window.removeEventListener('resize', updateChapterVisibility);
      window.removeEventListener('scroll', updateChapterVisibility);
    };
  }, []);

  useEffect(() => {
    const hostElement = hostReference.current;
    const chapterElement = hostElement?.parentElement;
    if (
      !hostElement ||
      !chapterElement ||
      !isChapterActive ||
      !isAnimationAllowed ||
      prefersReducedMotion ||
      hasRenderFailure ||
      typeof WebGLRenderingContext === 'undefined'
    ) {
      return;
    }

    const renderer = new WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 720 ? 1 : 1.5),
    );
    hostElement.append(renderer.domElement);

    const isCompactViewport = window.innerWidth < 720;
    const camera = new PerspectiveCamera(38, 1, 0.08, 90);
    const builtWorld = buildResearchWorldScene(
      isCompactViewport ? 44 : 78,
      isCompactViewport ? 9 : 19,
      renderer.capabilities.getMaxAnisotropy(),
    );
    let animationFrame = 0;
    const resizeRenderer = (): void => {
      const width = hostElement.clientWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      placeResearchWorldCamera(camera, camera.aspect);
      camera.updateProjectionMatrix();
    };
    const renderFrame = (frameTime: number): void => {
      builtWorld.update(frameTime / 1_000);
      renderer.render(builtWorld.scene, camera);
      animationFrame = requestAnimationFrame(renderFrame);
    };
    const resumeAnimation = (): void => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(renderFrame);
    };
    const handleContextLoss = (event: Event): void => {
      event.preventDefault();
      setHasRenderFailure(true);
    };

    resizeRenderer();
    resumeAnimation();
    window.addEventListener('resize', resizeRenderer);
    renderer.domElement.addEventListener('webglcontextlost', handleContextLoss);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeRenderer);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLoss);
      renderer.dispose();
      builtWorld.dispose();
      renderer.domElement.remove();
    };
  }, [hasRenderFailure, isAnimationAllowed, isChapterActive, prefersReducedMotion]);

  return (
    <div
      ref={hostReference}
      className="research-world-art"
      data-render-state={hasRenderFailure || prefersReducedMotion ? 'fallback' : 'live'}
      data-chapter-state={isChapterActive ? 'active' : 'inactive'}
      aria-hidden="true"
    >
      <div className="research-world-fallback" />
    </div>
  );
}
