import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export function SpacePostProcessing() {
  return (
    <EffectComposer multisampling={8}>
      <Bloom
        intensity={0.65}
        luminanceThreshold={0.82}
        luminanceSmoothing={0.28}
        mipmapBlur
      />
      <Noise opacity={0.01} />
      <Vignette eskil={false} offset={0.2} darkness={0.72} />
    </EffectComposer>
  );
}
