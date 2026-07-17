import { useMemo, useRef } from "react";
import { Group, InstancedMesh, Object3D } from "three";
import { useFrame } from "@react-three/fiber";

type AsteroidBeltProps = {
  count?: number;
  reducedMotion?: boolean;
};

export function AsteroidBelt({
  count = 650,
  reducedMotion = false,
}: AsteroidBeltProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<InstancedMesh>(null);

  const asteroidData = useMemo(() => {
    return Array.from(
      { length: count },
      () => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 10.2 + Math.random() * 1.9;
        const scale = 0.015 + Math.random() * 0.075;

        return {
          angle,
          radius,
          scale,
          y: (Math.random() - 0.5) * 0.45,
        };
      },
    );
  }, [count]);

  const temporaryObject = useMemo(() => new Object3D(), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        delta * 0.012 * (reducedMotion ? 0.1 : 1);
    }

    if (!meshRef.current) {
      return;
    }

    // Only set matrix once if not animating individual asteroids heavily
    // Since group rotates them all, we don't need to update instances every frame
    // unless we want individual rotations. The original code did this every frame,
    // which was a performance bottleneck.
  });

  // Set initial positions
  useMemo(() => {
    if(!meshRef.current) return;
    // but we can't reliably set it here if meshRef is null, so we do it in a useEffect or useFrame once
  }, []);

  // Alternative: update once in useFrame
  const initialized = useRef(false);
  useFrame(() => {
    if (initialized.current || !meshRef.current) return;
    
    asteroidData.forEach((asteroid, index) => {
      temporaryObject.position.set(
        Math.cos(asteroid.angle) * asteroid.radius,
        asteroid.y,
        Math.sin(asteroid.angle) * asteroid.radius,
      );

      temporaryObject.rotation.set(
        asteroid.angle,
        asteroid.angle * 0.6,
        asteroid.angle * 0.25,
      );

      temporaryObject.scale.setScalar(asteroid.scale);
      temporaryObject.updateMatrix();

      meshRef.current?.setMatrixAt(index, temporaryObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    initialized.current = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
      >
        <dodecahedronGeometry args={[1, 0]} />

        <meshStandardMaterial
          color="#77716e"
          roughness={1}
        />
      </instancedMesh>
    </group>
  );
}
