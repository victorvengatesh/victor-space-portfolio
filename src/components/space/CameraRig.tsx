import { useRef, useMemo, useEffect } from "react";
import { Group, MathUtils } from "three";
import { useFrame, useThree } from "@react-three/fiber";

type CameraRigProps = {
  children: React.ReactNode;
  reducedMotion?: boolean;
};

export function CameraRig({
  children,
  reducedMotion = false,
}: CameraRigProps) {
  const groupRef = useRef<Group>(null);
  const scrollRef = useRef(0);

  const { pointer, camera } = useThree();

  // Use a passive listener for scroll to avoid reading layout every frame
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const multiplier = reducedMotion ? 0 : 1;

    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.055 * multiplier,
      0.035,
    );

    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.035 * multiplier,
      0.035,
    );

    const scrollProgress = Math.min(scrollRef.current, 1);

    camera.position.z = MathUtils.lerp(
      camera.position.z,
      24 - scrollProgress * 5,
      0.025,
    );

    camera.position.y = MathUtils.lerp(
      camera.position.y,
      4 - scrollProgress * 2,
      0.025,
    );

    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}
