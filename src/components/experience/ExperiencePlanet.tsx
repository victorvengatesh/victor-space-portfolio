import { Html, Sparkles, Float, Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function ExperiencePlanet() {
  const planetRef = useRef<THREE.Mesh>(null)
  const probeRef = useRef<THREE.Group>(null)
  
  const orbitRadius = 2.8
  const probeSpeed = 0.4

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.05
      planetRef.current.rotation.x += delta * 0.02
    }
    
    if (probeRef.current) {
      const time = state.clock.elapsedTime
      probeRef.current.position.x = Math.cos(time * probeSpeed) * orbitRadius
      probeRef.current.position.z = Math.sin(time * probeSpeed) * orbitRadius
      
      // Orient probe along the path
      probeRef.current.rotation.y = -(time * probeSpeed)
    }
  })

  // Generate a simple procedural canvas texture for the planet surface
  const planetTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = '#0a192f' // Dark navy base
      context.fillRect(0, 0, 512, 256)
      
      // Draw grid lines
      context.strokeStyle = 'rgba(0, 255, 255, 0.15)'
      context.lineWidth = 1
      for (let i = 0; i < 512; i += 32) {
        context.beginPath()
        context.moveTo(i, 0)
        context.lineTo(i, 256)
        context.stroke()
      }
      for (let i = 0; i < 256; i += 32) {
        context.beginPath()
        context.moveTo(0, i)
        context.lineTo(512, i)
        context.stroke()
      }
      
      // Add random data dots
      for(let i=0; i<200; i++) {
        context.fillStyle = Math.random() > 0.5 ? '#00ffff' : '#8a2be2'
        context.globalAlpha = Math.random() * 0.5 + 0.1
        context.beginPath()
        context.arc(Math.random() * 512, Math.random() * 256, Math.random() * 1.5, 0, Math.PI * 2)
        context.fill()
      }
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])

  // Create an ellipse curve for the orbit line
  const orbitLinePoints = useMemo(() => {
    const points = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius))
    }
    return points
  }, [orbitRadius])

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, 0, 0]}>
        {/* Local Lighting for the Planet */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#d4e8ff" />
        <pointLight position={[-4, -2, -4]} intensity={2.5} color="#00ffff" distance={10} />
        <pointLight position={[3, -4, -2]} intensity={2.0} color="#b442ff" distance={8} />

        {/* The Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshPhysicalMaterial 
            color="#0f2040"
            emissive="#004455"
            emissiveIntensity={0.2}
            roughness={0.6}
            metalness={0.4}
            clearcoat={0.3}
            map={planetTexture}
          />
        </mesh>
        
        {/* Atmospheric Glow */}
        <mesh scale={1.05}>
          <sphereGeometry args={[1.8, 48, 48]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.08} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Orbit Line */}
        <Line 
          points={orbitLinePoints} 
          color="#00ffff" 
          lineWidth={0.5} 
          transparent 
          opacity={0.3} 
        />
        
        {/* Orbit Particles */}
        <group rotation={[0, 0, 0]}>
           <Sparkles count={40} scale={[orbitRadius * 2.2, 0.2, orbitRadius * 2.2]} size={1.2} speed={0.4} opacity={0.6} color="#00ffff" />
        </group>

        {/* Orbital Probe */}
        <group ref={probeRef}>
          <mesh>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.8} />
          </mesh>
          <mesh scale={1.5}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.3} wireframe />
          </mesh>
        </group>

        {/* Holographic Label */}
        <Html position={[0, 2.5, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.4)',
            color: '#00ffff',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'monospace',
            letterSpacing: '2px',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)'
          }}>
            AI / ML MISSION
          </div>
        </Html>
      </group>
    </Float>
  )
}
