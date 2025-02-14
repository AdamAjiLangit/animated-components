'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../hamburger/Button';

gsap.registerPlugin(ScrollTrigger);

const RoomModel = () => {
    const { scene } = useGLTF('/room.glb');
    return <primitive object={scene} scale={1.5} />;
};

const CameraController = () => {
    const cameraRef = useRef();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(cameraRef.current.position, {
                z: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    // markers: true,
                },
            });
        });
        return () => ctx.revert();
    }, []);

    useFrame(({ camera }) => {
        if (cameraRef.current) {
            camera.position.lerp(cameraRef.current.position, 0.1);
            camera.lookAt(0, 1, 0);
        }
    });

    return <perspectiveCamera ref={cameraRef} position={[0, 1, 5]} />;
};

export default function Home() {
    return (
        <div className="min-h-screen">
            <Canvas
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                }}
            >
                <CameraController />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <RoomModel />
            </Canvas>
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
                <Button />
            </div>

            <div className="h-[200vh]"></div>
        </div>
    );
}