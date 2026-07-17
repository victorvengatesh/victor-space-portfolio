import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  SpaceErrorBoundary,
} from "./SpaceErrorBoundary";

const RealisticSolarSystem = lazy(async () => {
  const module = await import("./RealisticSolarSystem");

  return {
    default: module.RealisticSolarSystem,
  };
});

function StaticSpaceFallback() {
  return (
    <div
      className="static-space-fallback"
      aria-hidden="true"
    >
      <div className="static-space-stars" />
      <div className="static-space-nebula" />
    </div>
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");

    return Boolean(
      window.WebGLRenderingContext &&
        (
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl")
        ),
    );
  } catch {
    return false;
  }
}

export function SpaceBackground() {
  const [webGLAvailable, setWebGLAvailable] =
    useState<boolean | null>(null);

  useEffect(() => {
    setWebGLAvailable(supportsWebGL());
  }, []);

  if (webGLAvailable === null) {
    return <StaticSpaceFallback />;
  }

  if (!webGLAvailable) {
    return <StaticSpaceFallback />;
  }

  return (
    <SpaceErrorBoundary
      fallback={<StaticSpaceFallback />}
    >
      <Suspense
        fallback={<StaticSpaceFallback />}
      >
        <RealisticSolarSystem />
      </Suspense>
    </SpaceErrorBoundary>
  );
}
