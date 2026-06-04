import * as THREE from "three";

export type TvScreenPlacement = {
  position: [number, number, number];
  size: [number, number];
  rotation: [number, number, number];
};

/**
 * Finds the flat screen mesh on a TV GLB, hides it, and returns placement for a poster plane.
 */
export function extractTvScreenPlacement(
  root: THREE.Object3D,
): TvScreenPlacement | null {
  let screenMesh: THREE.Mesh | null = null;
  let bestScore = 0;

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;

    const name = obj.name.toLowerCase();
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    box.getSize(size);

    const isScreenName =
      name.includes("screen") ||
      name.includes("display") ||
      name.includes("glass");
    const aspect = size.x / Math.max(size.y, 0.001);
    const flatEnough = aspect > 0.8 && aspect < 2.2;
    const area = size.x * size.y;
    const score =
      (isScreenName ? 4 : 0) + (flatEnough ? 2 : 0) + area * (isScreenName ? 2 : 0.5);

    if (score > bestScore) {
      bestScore = score;
      screenMesh = obj;
    }
  });

  if (!screenMesh) return null;
  const mesh = screenMesh as THREE.Mesh;

  mesh.visible = false;
  mesh.updateMatrixWorld(true);

  const worldPos = new THREE.Vector3();
  const worldQuat = new THREE.Quaternion();
  mesh.getWorldPosition(worldPos);
  mesh.getWorldQuaternion(worldQuat);

  root.worldToLocal(worldPos);
  const rootQuat = new THREE.Quaternion();
  root.getWorldQuaternion(rootQuat);
  worldQuat.premultiply(rootQuat.invert());

  const euler = new THREE.Euler().setFromQuaternion(worldQuat);
  const box = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  box.getSize(size);

  return {
    position: [worldPos.x, worldPos.y, worldPos.z + 0.01],
    size: [size.x * 0.92, size.y * 0.92],
    rotation: [euler.x, euler.y, euler.z],
  };
}
