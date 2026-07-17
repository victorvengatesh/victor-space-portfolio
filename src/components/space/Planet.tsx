import { memo, useMemo, useRef } from "react";
import { Group, Mesh, MathUtils, SRGBColorSpace } from "three";
import { Line, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { PlanetConfiguration } from "./spaceData";
import { Atmosphere } from "./Atmosphere";

type PlanetProps = {
  config: PlanetConfiguration;
  reducedMotion?: boolean;
};

function PlanetComponent({
  config,
  reducedMotion = false,
}: PlanetProps) {
  const orbitingGroupRef = useRef<Group>(null);
  const planetRef = useRef<Mesh>(null);

  const textures = useTexture({
    map: config.texture,
    ...(config.normalMap
      ? { normalMap: config.normalMap }
      : {}),
    ...(config.roughnessMap
      ? { roughnessMap: config.roughnessMap }
      : {}),
  });

  if (textures.map) {
    textures.map.colorSpace = SRGBColorSpace;
  }

  const orbitPoints = useMemo(() => {
    const points: [number, number, number][] = [];

    for (let index = 0; index <= 160; index += 1) {
      const angle = (index / 160) * Math.PI * 2;

      points.push([
        Math.cos(angle) * config.orbitRadius,
        config.y ?? 0,
        Math.sin(angle) * config.orbitRadius,
      ]);
    }

    return points;
  }, [config.orbitRadius, config.y]);

  useFrame(({ clock }, delta) => {
    if (!orbitingGroupRef.current || !planetRef.current) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    const angle =
      config.initialAngle +
      elapsedTime *
        config.orbitSpeed *
        (reducedMotion ? 0.12 : 1);

    orbitingGroupRef.current.position.set(
      Math.cos(angle) * config.orbitRadius,
      config.y ?? 0,
      Math.sin(angle) * config.orbitRadius,
    );

    planetRef.current.rotation.y +=
      delta *
      config.rotationSpeed *
      (reducedMotion ? 0.1 : 1);
  });

  return (
    <>
      <Line
        points={orbitPoints}
        color="#42677b"
        transparent
        opacity={0.18}
        lineWidth={0.6}
      />

      <group ref={orbitingGroupRef}>
        <group
          rotation={[
            0,
            0,
            MathUtils.degToRad(config.axialTilt),
          ]}
        >
          <mesh
            ref={planetRef}
            castShadow
            receiveShadow
            scale={config.radius}
          >
            <sphereGeometry args={[1, 96, 96]} />

            <meshStandardMaterial
              {...textures}
              roughness={0.9}
              metalness={0}
            />
          </mesh>

          {config.atmosphereColor && (
            <Atmosphere
              radius={config.radius}
              color={config.atmosphereColor}
              intensity={0.45}
            />
          )}
        </group>
      </group>
    </>
  );
}

export const Planet = memo(PlanetComponent);
