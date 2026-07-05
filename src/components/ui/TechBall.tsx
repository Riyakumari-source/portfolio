/* eslint-disable react-refresh/only-export-components */
import {
  TextureLoader,
  SphereGeometry,
  Vector3,
  MathUtils,
  MeshPhysicalMaterial,
} from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const assetTextureLoader = new TextureLoader();
const logoTextureUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

export const loadedTextures = logoTextureUrls.map((url) => assetTextureLoader.load(url));

const sphericalGeometryRef = new SphereGeometry(1, 28, 28);

export const sphereInstances = [...Array(45)].map(() => ({
  scale: [0.5, 0.65, 0.55, 0.7, 0.6][Math.floor(Math.random() * 5)],
}));

type PhysicsSphereProps = {
  vectorCoords?: Vector3;
  scale: number;
  randomSpread?: typeof MathUtils.randFloatSpread;
  material: MeshPhysicalMaterial;
  isActive: boolean;
};

export function PhysicsSphere({
  vectorCoords = new Vector3(),
  scale,
  randomSpread = MathUtils.randFloatSpread,
  material,
  isActive,
}: PhysicsSphereProps) {
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);

  useFrame((_state, deltaSec) => {
    if (!isActive) return;
    const boundedDelta = Math.min(0.1, deltaSec);
    const radialImpulse = vectorCoords
      .copy(rigidBodyRef.current!.translation())
      .normalize()
      .multiply(
        new Vector3(
          -50 * boundedDelta * scale,
          -150 * boundedDelta * scale,
          -50 * boundedDelta * scale
        )
      );

    rigidBodyRef.current?.applyImpulse(radialImpulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[randomSpread(20), randomSpread(20) - 25, randomSpread(20) - 10]}
      ref={rigidBodyRef}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphericalGeometryRef}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type KinematicMouseColliderProps = {
  positionVector?: Vector3;
  isActive: boolean;
  isHovering: boolean;
};

export function KinematicMouseCollider({
  positionVector = new Vector3(),
  isActive,
  isHovering,
}: KinematicMouseColliderProps) {
  const colliderRef = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const nextCursorCoordsVec = positionVector.lerp(
      new Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    colliderRef.current?.setNextKinematicTranslation(nextCursorCoordsVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={colliderRef}
    >
      <BallCollider args={[isHovering ? 6.5 : 3.2]} />
    </RigidBody>
  );
}
export default PhysicsSphere;
