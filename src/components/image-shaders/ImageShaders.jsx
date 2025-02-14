import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

const ImageShaders = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const planeMeshRef = useRef(null);

    const currentState = useRef({
        mousePosition: { x: 0, y: 0 },
        waveIntensity: 0.005,
    });

    const targetState = useRef({
        mousePosition: { x: 0, y: 0 },
        waveIntensity: 0.005,
    });

    const ANIMATION_CONFIG = {
        transitionSpeed: 0.03,
        baseIntensity: 0.005,
        hoverIntensity: 0.009,
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
        targetState.current.mousePosition.x =
            ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetState.current.mousePosition.y =
            -((e.clientY - rect.top) / rect.height) * 2 + 1;
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
            "https://v5.airtableusercontent.com/v3/u/38/38/1739512800000/BFcu-FU038DKCdW7iS2NIA/kJ3slGZWPBSoCElBPOQvnBsetPx8wM9__3Ol5oKTU8sJk0TvfWv6ix47WArq-gtGjwXGvi5IsAnTAREqU3MogN8EdZaOwo-QupyuPFXx9MsZf55ah1trZWOcNgJ081ylb20twycA2kIYI5boke613yadCalKPApDOn0gXYb0nYCbjbVh0JP2toYaIFREuxOj/Jm2jmCq4gCPXxRcGOaVTJlUopCmbpKSI8Wb0Kc6i2rM"
        );

        const camera = new THREE.PerspectiveCamera(
            80,
            container.offsetWidth / container.offsetHeight,
            0.01,
            10
        );
        camera.position.z = 1;
        cameraRef.current = camera;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const uniforms = {
            u_time: { value: 1.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_intensity: { value: currentState.current.waveIntensity },
            u_texture: { value: texture },
        };

        const planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.ShaderMaterial({
                uniforms,
                vertexShader,
                fragmentShader,
            })
        );
        planeMeshRef.current = planeMesh;
        scene.add(planeMesh);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseover", handleMouseOver);
        container.addEventListener("mouseout", handleMouseOut);
        requestAnimationFrame(animate);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseover", handleMouseOver);
            container.removeEventListener("mouseout", handleMouseOut);
            renderer.dispose();
            scene.remove(planeMesh);
            if (renderer.domElement) renderer.domElement.remove();
        };
    }, [animate, handleMouseMove, handleMouseOut, handleMouseOver]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Three.js Background */}
            <div
                ref={containerRef}
                className="absolute top-0 left-0 w-full h-full"
            />

            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <h1 className="text-white text-5xl font-bold">Your Centered Text</h1>
            </div>
        </div>
    );
};

export default ImageShaders;
