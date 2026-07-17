import { useMemo, useRef } from "react";
import { AdditiveBlending, Group, MathUtils, Mesh, SRGBColorSpace } from "three";
import { Line, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Atmosphere } from "./Atmosphere";
import { Moon } from "./Moon";

type EarthProps = {
  reducedMotion?: boolean;
};

export function Earth({
  reducedMotion = false,
}: EarthProps) {
  const earthOrbitRef = useRef<Group>(null);
  const earthRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);

  const [
    earthDay,
    earthNormal,
    earthRoughness,
    earthClouds,
    earthNight,
  ] = useTexture([
    "/textures/space/earth-day.jpg",
    "/textures/space/earth-normal.jpg",
    "/textures/space/earth-roughness.jpg",
    "/textures/space/earth-clouds.png",
    "/textures/space/earth-night.jpg",
  ]);

  earthDay.colorSpace = SRGBColorSpace;
  earthClouds.colorSpace = SRGBColorSpace;
  earthNight.colorSpace = SRGBColorSpace;
  
  const orbitRadius = 5.7;

  const orbitPoints = useMemo(() => {
    return Array.from(
      { length: 181 },
      (_, index): [number, number, number] => {
        const angle =
          (index / 180) * Math.PI * 2;

        return [
          Math.cos(angle) * orbitRadius,
          0,
          Math.sin(angle) * orbitRadius,
        ];
      },
    );
  }, []);

  useFrame(({ clock }, delta) => {
    const speedMultiplier =
      reducedMotion ? 0.1 : 1;

    const elapsedTime =
      clock.getElapsedTime();

    if (earthOrbitRef.current) {
      const angle =
        elapsedTime *
        0.085 *
        speedMultiplier;

      earthOrbitRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius,
      );
    }

    if (earthRef.current) {
      earthRef.current.rotation.y +=
        delta * 0.12 * speedMultiplier;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y +=
        delta * 0.145 * speedMultiplier;
    }
  });

  return (
    <>
      <Line
        points={orbitPoints}
        color="#59d8ff"
        transparent
        opacity={0.22}
        lineWidth={0.75}
      />

      <group ref={earthOrbitRef}>
        <group
          rotation={[
            0,
            0,
            MathUtils.degToRad(23.44),
          ]}
        >
          <mesh
            ref={earthRef}
            castShadow
            receiveShadow
            scale={1}
          >
            <sphereGeometry args={[1, 128, 128]} />

            <meshStandardMaterial
              map={earthDay}
              normalMap={earthNormal}
              roughnessMap={earthRoughness}
              roughness={0.92}
              metalness={0}
            />
          </mesh>

          <mesh scale={1.007}>
            <sphereGeometry args={[1, 128, 128]} />

            <meshBasicMaterial
              map={earthNight}
              transparent
              opacity={0.5}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          <mesh
            ref={cloudsRef}
            scale={1.014}
          >
            <sphereGeometry args={[1, 128, 128]} />

            <meshStandardMaterial
              map={earthClouds}
              transparent
              opacity={0.48}
              roughness={1}
              depthWrite={false}
            />
          </mesh>

          <Atmosphere
            radius={1}
            color="#42cfff"
            intensity={0.85}
          />

          <Moon
            reducedMotion={reducedMotion}
          />
        </group>
      </group>
    </>
  );
}
