"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { useRef } from "react"
import { Mesh } from "three"

function AnimatedSphere({ color, position, scale }: { color: string, position: [number, number, number], scale: number }) {
    const meshRef = useRef<Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>
        </Float>
    )
}

export default function ThreeHero() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                {/* Abstract Sports Balls/Shapes */}
                <AnimatedSphere color="#ea580c" position={[2, 0, -2]} scale={1.2} /> {/* Ancient Orange (Basketball-ish) */}
                <AnimatedSphere color="#ffffff" position={[-2, 1, -1]} scale={1} /> {/* White (Soccer-ish) */}
                <AnimatedSphere color="#bef264" position={[0, -2, 0]} scale={0.8} /> {/* Tennis Yellow-ish */}

                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
