import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, LineSegments, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

type ShootingStar = {
  start: Vector3;
  direction: Vector3;
  speed: number;
  progress: number;
  delay: number;
};

export function ShootingStars() {
  const lineRef = useRef<LineSegments>(null);

  const stars = useMemo<ShootingStar[]>(
    () =>
      Array.from(
        { length: 8 },
        () => ({
          start: new Vector3(
            -18 + Math.random() * 36,
            5 + Math.random() * 14,
            -18 + Math.random() * 18,
          ),
          direction: new Vector3(
            1,
            -0.45 - Math.random() * 0.25,
            0.15,
          ).normalize(),
          speed: 5 + Math.random() * 5,
          progress: Math.random(),
          delay: Math.random() * 7,
        }),
      ),
    [],
  );

  const geometry = useMemo(() => {
    const positions = new Float32Array(stars.length * 6);
    const newGeometry = new BufferGeometry();
    newGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return newGeometry;
  }, [stars.length]);

  const tempHead = useMemo(() => new Vector3(), []);
  const tempTail = useMemo(() => new Vector3(), []);

  useFrame(({ clock }, delta) => {
    const positionAttribute = geometry.getAttribute("position") as Float32BufferAttribute;
    const elapsedTime = clock.getElapsedTime();

    stars.forEach((star, index) => {
      if (elapsedTime < star.delay) return;

      star.progress += delta * star.speed * 0.08;

      if (star.progress > 1) {
        star.progress = 0;
        star.delay = elapsedTime + 2 + Math.random() * 8;
      }

      tempHead.copy(star.start).addScaledVector(star.direction, star.progress * 30);
      tempTail.copy(tempHead).addScaledVector(star.direction, -1.8);

      const offset = index * 6;
      positionAttribute.array[offset] = tempHead.x;
      positionAttribute.array[offset + 1] = tempHead.y;
      positionAttribute.array[offset + 2] = tempHead.z;
      
      positionAttribute.array[offset + 3] = tempTail.x;
      positionAttribute.array[offset + 4] = tempTail.y;
      positionAttribute.array[offset + 5] = tempTail.z;
    });

    positionAttribute.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#d9f8ff"
        transparent
        opacity={0.72}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
