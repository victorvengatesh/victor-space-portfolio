type PlanetFallbackProps = {
  color?: string;
  scale?: number;
};

export function PlanetFallback({
  color = "#4da9c7",
  scale = 1,
}: PlanetFallbackProps) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0}
      />
    </mesh>
  );
}
