import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 900

function ParticleField({ scrollRef, mouseRef }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x = scrollRef.current * 0.4
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mouseRef.current.x * 0.6,
      0.02
    )
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      mouseRef.current.y * 0.6,
      0.02
    )
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#4C6FFF"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

function DriftingShape({ position, color, speed, scrollRef, scrollFactor = 1 }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * speed
    meshRef.current.rotation.y += delta * speed * 0.7
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.6 - scrollRef.current * scrollFactor
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1.4, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  )
}

export default function Background3D() {
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    const handleMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <ParticleField scrollRef={scrollRef} mouseRef={mouseRef} />
        <DriftingShape position={[-4.5, 2, -3]} color="#22D3EE" speed={0.06} scrollRef={scrollRef} scrollFactor={4} />
        <DriftingShape position={[5, -2, -4]} color="#7C5CFC" speed={0.09} scrollRef={scrollRef} scrollFactor={-3} />
        <DriftingShape position={[2, 3.5, -6]} color="#4C6FFF" speed={0.04} scrollRef={scrollRef} scrollFactor={2} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
    </div>
  )
}
