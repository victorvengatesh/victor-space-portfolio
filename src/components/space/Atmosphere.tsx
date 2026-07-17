import { BackSide, AdditiveBlending, Color } from "three";

type AtmosphereProps = {
  radius: number;
  color?: string;
  intensity?: number;
};

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 atmosphereColor;
  uniform float intensity;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDirection =
      normalize(cameraPosition - vWorldPosition);

    float fresnel =
      pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 3.0);

    float alpha = fresnel * intensity;

    gl_FragColor = vec4(
      atmosphereColor * (1.0 + fresnel * 0.5),
      alpha
    );
  }
`;

export function Atmosphere({
  radius,
  color = "#45caff",
  intensity = 0.75,
}: AtmosphereProps) {
  return (
    <mesh scale={radius * 1.055}>
      <sphereGeometry args={[1, 96, 96]} />

      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          atmosphereColor: {
            value: new Color(color),
          },
          intensity: {
            value: intensity,
          },
        }}
        side={BackSide}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}
