import { useMemo, useRef } from "react";
import { DoubleSide, Group, MathUtils, Mesh, SRGBColorSpace } from "three";
import { Line, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type SaturnProps = {
  reducedMotion?: boolean;
};

export function Saturn({
  reducedMotion = false,
}: SaturnProps) {
  const orbitGroupRef = useRef<Group>(null);
  const planetRef = useRef<Mesh>(null);
  const ringsRef = useRef<Mesh>(null);

  const [saturnTexture, ringTexture] =
    useTexture([
      "/textures/space/saturn.jpg",
      "/textures/space/saturn-ring.png",
    ]);

  saturnTexture.colorSpace = SRGBColorSpace;
  ringTexture.colorSpace = SRGBColorSpace;

  const orbitRadius = 18;

  const orbitPoints = useMemo(() => {
    return Array.from(
      { length: 181 },
      (_, index): [number, number, number] => {
        const angle =
          (index / 180) * Math.PI * 2;

        return [
          Math.cos(angle) * orbitRadius,
          -0.2,
          Math.sin(angle) * orbitRadius,
        ];
      },
    );
  }, []);

  useFrame(({ clock }, delta) => {
    const multiplier =
      reducedMotion ? 0.1 : 1;

    const angle =
      4.4 +
      clock.getElapsedTime() *
        0.014 *
        multiplier;

    if (orbitGroupRef.current) {
      orbitGroupRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        -0.2,
        Math.sin(angle) * orbitRadius,
      );
    }

    if (planetRef.current) {
      planetRef.current.rotation.y +=
        delta * 0.17 * multiplier;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z +=
        delta * 0.003 * multiplier;
    }
  });

  return (
    <>
      <Line
        points={orbitPoints}
        color="#8a7b70"
        transparent
        opacity={0.14}
        lineWidth={0.5}
      />

      <group ref={orbitGroupRef}>
        <group
          rotation={[
            MathUtils.degToRad(4),
            0,
            MathUtils.degToRad(26.73),
          ]}
        >
          <mesh
            ref={planetRef}
            castShadow
            receiveShadow
            scale={1.55}
          >
            <sphereGeometry args={[1, 96, 96]} />

            <meshStandardMaterial
              map={saturnTexture}
              roughness={0.95}
            />
          </mesh>

          <mesh
            ref={ringsRef}
            rotation={[
              Math.PI / 2,
              0,
              0,
            ]}
          >
            <ringGeometry
              args={[
                1.85,
                3.15,
                256,
              ]}
            />

            <meshStandardMaterial
              map={ringTexture}
              transparent
              alphaTest={0.08}
              opacity={0.92}
              side={DoubleSide}
              roughness={0.9}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}
