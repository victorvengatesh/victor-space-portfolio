import { useRef } from "react";
import { AdditiveBlending, Color, Mesh, SRGBColorSpace } from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const sunVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  uniform float time;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec3 displacedPosition = position;

    float pulse =
      sin(position.y * 10.0 + time * 1.2) *
      sin(position.x * 8.0 - time * 0.8) *
      0.012;

    displacedPosition += normal * pulse;

    vec4 worldPosition =
      modelMatrix *
      vec4(displacedPosition, 1.0);

    vWorldPosition = worldPosition.xyz;

    gl_Position =
      projectionMatrix *
      viewMatrix *
      worldPosition;
  }
`;

const sunFragmentShader = `
  uniform sampler2D sunTexture;
  uniform float time;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec2 animatedUv = vUv;

    animatedUv.x +=
      sin(vUv.y * 18.0 + time * 0.12) *
      0.008;

    animatedUv.y += time * 0.006;

    vec3 textureColor =
      texture2D(
        sunTexture,
        animatedUv
      ).rgb;

    float pulse =
      0.92 +
      sin(time * 1.3) * 0.06;

    vec3 viewDirection =
      normalize(
        cameraPosition -
        vWorldPosition
      );

    float fresnel =
      pow(
        1.0 -
        max(
          dot(
            normalize(vNormal),
            viewDirection
          ),
          0.0
        ),
        2.2
      );

    vec3 finalColor =
      textureColor *
      pulse;

    finalColor +=
      vec3(1.0, 0.28, 0.04) *
      fresnel *
      0.65;

    gl_FragColor =
      vec4(finalColor, 1.0);
  }
`;

export function Sun() {
  const sunRef = useRef<Mesh>(null);
  const materialRef = useRef<any>(null);

  const sunTexture = useTexture(
    "/textures/space/sun.jpg",
  );
  sunTexture.colorSpace = SRGBColorSpace;

  useFrame(({ clock }, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y +=
        delta * 0.025;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.time.value =
        clock.getElapsedTime();
    }
  });

  return (
    <group>
      <mesh
        ref={sunRef}
        scale={2.4}
      >
        <sphereGeometry args={[1, 128, 128]} />

        <shaderMaterial
          ref={materialRef}
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          uniforms={{
            time: {
              value: 0,
            },
            sunTexture: {
              value: sunTexture,
            },
          }}
        />
      </mesh>

      <mesh scale={2.58}>
        <sphereGeometry args={[1, 96, 96]} />

        <meshBasicMaterial
          color={new Color("#ff6b19")}
          transparent
          opacity={0.11}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <pointLight
        color="#ffd0a0"
        intensity={28}
        distance={90}
        decay={1.45}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  );
}
