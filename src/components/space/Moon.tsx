import { useRef } from "react";
import { Group, Mesh, SRGBColorSpace } from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

type MoonProps = {
  reducedMotion?: boolean;
};

export function Moon({
  reducedMotion = false,
}: MoonProps) {
  const moonGroupRef = useRef<Group>(null);
  const moonRef = useRef<Mesh>(null);

  const moonTexture = useTexture(
    "/textures/space/moon.jpg",
  );
  
  moonTexture.colorSpace = SRGBColorSpace;

  useFrame(({ clock }, delta) => {
    const speedMultiplier =
      reducedMotion ? 0.1 : 1;

    const elapsedTime =
      clock.getElapsedTime();

    if (moonGroupRef.current) {
      const angle =
        elapsedTime *
        0.42 *
        speedMultiplier;

      moonGroupRef.current.position.set(
        Math.cos(angle) * 1.65,
        Math.sin(angle * 0.55) * 0.14,
        Math.sin(angle) * 1.65,
      );
    }

    if (moonRef.current) {
      moonRef.current.rotation.y +=
        delta * 0.05 * speedMultiplier;
    }
  });

  return (
    <group ref={moonGroupRef}>
      <mesh
        ref={moonRef}
        castShadow
        receiveShadow
        scale={0.27}
      >
        <sphereGeometry args={[1, 64, 64]} />

        <meshStandardMaterial
          map={moonTexture}
          roughness={1}
        />
      </mesh>
    </group>
  );
}
