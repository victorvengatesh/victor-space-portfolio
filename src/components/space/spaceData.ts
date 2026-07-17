export type PlanetConfiguration = {
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  axialTilt: number;
  initialAngle: number;
  texture: string;
  normalMap?: string;
  roughnessMap?: string;
  atmosphereColor?: string;
  y?: number;
};

export const planetData: PlanetConfiguration[] = [
  {
    name: "Mars",
    radius: 0.7,
    orbitRadius: 8.5,
    orbitSpeed: 0.055,
    rotationSpeed: 0.12,
    axialTilt: 25.19,
    initialAngle: 1.4,
    texture: "/textures/space/mars.jpg",
    normalMap: "/textures/space/mars-normal.jpg",
    atmosphereColor: "#d97b53",
    y: -0.15,
  },
  {
    name: "Jupiter",
    radius: 1.9,
    orbitRadius: 13,
    orbitSpeed: 0.022,
    rotationSpeed: 0.2,
    axialTilt: 3.13,
    initialAngle: 3.1,
    texture: "/textures/space/jupiter.jpg",
    atmosphereColor: "#d8b28a",
    y: 0.25,
  },
];
