import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import Button from '../hamburger/Button';

const WaveShaders = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const planeMeshRef = useRef(null);

    const currentState = useRef({
        mousePosition: { x: 0, y: 0 },
        waveIntensity: 0.005
    });

    const targetState = useRef({
        mousePosition: { x: 0, y: 0 },
        waveIntensity: 0.005
    });

    const ANIMATION_CONFIG = {
        transitionSpeed: 0.03,
        baseIntensity: 0.005,
        hoverIntensity: 0.009
    };

    const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_intensity;
    uniform sampler2D u_texture;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
        float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
        float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
        float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

        uv.y += wave1 + wave2;
        uv.x += wave3 + wave4;
        
        gl_FragColor = texture2D(u_texture, uv);
    }
  `;

    const updateValue = (target, current, speed) =>
        current + (target - current) * speed;

    const animate = useCallback(() => {
        const uniforms = planeMeshRef.current.material.uniforms;

        currentState.current.mousePosition.x = updateValue(
            targetState.current.mousePosition.x,
            currentState.current.mousePosition.x,
            ANIMATION_CONFIG.transitionSpeed
        );

        currentState.current.mousePosition.y = updateValue(
            targetState.current.mousePosition.y,
            currentState.current.mousePosition.y,
            ANIMATION_CONFIG.transitionSpeed
        );

        currentState.current.waveIntensity = updateValue(
            targetState.current.waveIntensity,
            currentState.current.waveIntensity,
            ANIMATION_CONFIG.transitionSpeed
        );

        uniforms.u_intensity.value = currentState.current.waveIntensity;
        uniforms.u_time.value += 0.005;
        uniforms.u_mouse.value.set(
            currentState.current.mousePosition.x,
            currentState.current.mousePosition.y
        );

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        requestAnimationFrame(animate);
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = containerRef.current.getBoundingClientRect();
        targetState.current.mousePosition.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetState.current.mousePosition.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }, []);

    const handleMouseOver = useCallback(() => {
        targetState.current.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
    }, []);

    const handleMouseOut = useCallback(() => {
        targetState.current.waveIntensity = ANIMATION_CONFIG.baseIntensity;
        targetState.current.mousePosition = { x: 0, y: 0 };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const texture = new THREE.TextureLoader().load(
            "/img/bg.jpg"
        );

        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.01, 10);
        camera.position.z = 1;
        cameraRef.current = camera;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const uniforms = {
            u_time: { value: 1.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_intensity: { value: currentState.current.waveIntensity },
            u_texture: { value: texture }
        };

        const geometry = new THREE.PlaneGeometry(aspect * 2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader
        });

        const planeMesh = new THREE.Mesh(geometry, material);
        planeMeshRef.current = planeMesh;
        scene.add(planeMesh);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        const handleResize = () => {
            const newAspect = window.innerWidth / window.innerHeight;
            camera.aspect = newAspect;
            camera.updateProjectionMatrix();
            planeMesh.geometry.dispose();
            planeMesh.geometry = new THREE.PlaneGeometry(newAspect * 2, 2);
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseover', handleMouseOver);
        container.addEventListener('mouseout', handleMouseOut);
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseover', handleMouseOver);
            container.removeEventListener('mouseout', handleMouseOut);
            renderer.dispose();
            scene.remove(planeMesh);
            if (renderer.domElement) renderer.domElement.remove();
        };
    }, [animate, handleMouseMove, handleMouseOut, handleMouseOver]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div
                ref={containerRef}
                className="absolute top-0 left-0 w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className='w-fit pointer-events-auto'>
                    <Button />
                </div>
            </div>
        </div>
    );
};

export default WaveShaders;
