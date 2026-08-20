/**
 * Establishes one locked camera composition for the research megastructure. Page
 * scroll never changes this view; only the HTML moves until the next visual chapter
 * replaces the fixed backdrop at the chapter boundary.
 */
import { Vector3, type PerspectiveCamera } from 'three';

const cameraTarget = new Vector3();

export function placeResearchWorldCamera(
  camera: PerspectiveCamera,
  viewportAspect = 1,
): void {
  const isWideViewport = viewportAspect >= 1.65;
  const isLandscapeViewport = viewportAspect >= 1.25;
  const cameraPositionX = isWideViewport ? -5.5 : isLandscapeViewport ? -2.5 : 2.2;
  const cameraDistance = isWideViewport ? 34 : isLandscapeViewport ? 32 : 30;
  cameraTarget.set(cameraPositionX, 0, 0);
  camera.position.set(cameraPositionX, 0.25, cameraDistance);
  camera.lookAt(cameraTarget);
  camera.rotation.z = 0;
}
