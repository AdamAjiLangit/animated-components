import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function BouncingCircle() {
    const meshRef = useRef(null);
    const timelineRef = useRef();

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.y = 10;
        }

        timelineRef.current = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        timelineRef.current
            .to(meshRef.current.position, {
                y: 0,
                duration: 1.5,
                ease: 'bounce.out',
                delay: 1
            })
            .to(meshRef.current.rotation, {
                y: Math.PI * 2,
                duration: 3,
                ease: 'power2.inOut'
            })
            .to(meshRef.current.position, {
                y: 10,
                duration: 1,
                ease: 'power2.in'
            });

        return () => {
            timelineRef.current?.kill();
        };
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} castShadow receiveShadow>
            <torusGeometry args={[1, 0.4, 16, 100]} />
            <meshPhysicalMaterial
                color="#fff"
                roughness={0.2}
                metalness={0.8}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
            />
        </mesh>
    );
}

export default function ThreeCircle() {
    return (
        <div style={{ width: '100vw', height: '100vh' }} className="bg-gray-900">
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight intensity={5} />
                <pointLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                />
                <pointLight
                    position={[-5, -5, -5]}
                    intensity={0.5}
                    color="#ff7e67"
                />
                <BouncingCircle />

                <OrbitControls
                    enableZoom={false}
                    enableRotate={false}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}