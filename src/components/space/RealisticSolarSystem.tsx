import { Suspense, useEffect } from "react";
import { PlanetErrorBoundary } from "./PlanetErrorBoundary";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload, Sparkles, Stars } from "@react-three/drei";

import { Earth } from "./Earth";
import { Planet } from "./Planet";
import { Saturn } from "./Saturn";
import { Sun } from "./Sun";
import { AsteroidBelt } from "./AsteroidBelt";
import { ShootingStars } from "./ShootingStars";
import { CameraRig } from "./CameraRig";
import { SpacePostProcessing } from "./SpacePostProcessing";
import { planetData } from "./spaceData";

type RealisticSolarSystemProps = {
  reducedMotion?: boolean;
};

export function RealisticSolarSystem({
  reducedMotion = false,
}: RealisticSolarSystemProps) {
  useEffect(() => {
    const canvas = document.querySelector(".realistic-space-canvas canvas");

    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.error("WebGL context was lost.");
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  return (
    <div className="realistic-space-canvas" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.4]}
        camera={{
          position: [0, 4, 24],
          fov: 45,
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#02040d", 1);
        }}
      >
        <color attach="background" args={["#02040d"]} />
        <fog attach="fog" args={["#02040d", 35, 95]} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[6, 8, 5]} intensity={1.2} color="#d8e9ff" />

        <Suspense fallback={null}>
          <CameraRig reducedMotion={reducedMotion}>
            <Sun />
            <PlanetErrorBoundary color="#42cfff" scale={1}>
              <Earth reducedMotion={reducedMotion} />
            </PlanetErrorBoundary>

            {planetData.map((planet) => (
              <PlanetErrorBoundary
                key={planet.name}
                color="#666"
                scale={planet.radius}
              >
                <Planet
                  config={planet}
                  reducedMotion={reducedMotion}
                />
              </PlanetErrorBoundary>
            ))}

            <PlanetErrorBoundary color="#e0c7a5" scale={1.55}>
              <Saturn reducedMotion={reducedMotion} />
            </PlanetErrorBoundary>
            
            <AsteroidBelt
              count={reducedMotion ? 180 : 650}
              reducedMotion={reducedMotion}
            />
          </CameraRig>

          <Stars
            radius={95}
            depth={70}
            count={reducedMotion ? 1800 : 6500}
            factor={3}
            saturation={0.15}
            fade
            speed={reducedMotion ? 0 : 0.12}
          />

          <Sparkles
            count={reducedMotion ? 80 : 320}
            scale={[45, 24, 45]}
            size={1.2}
            speed={reducedMotion ? 0 : 0.08}
            opacity={0.24}
            color="#6ba6ff"
          />

          {!reducedMotion && <ShootingStars />}

          <SpacePostProcessing />
          <AdaptiveDpr pixelated={false} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
