import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CursorEffect = () => {
    const trailsRef = useRef([]);
    const smoothPointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const totalPointsArray = [40, 35, 30, 25, 20, 15, 10];

    useEffect(() => {
        const handleMouseMove = (e) => {
            gsap.to(smoothPointer.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const updatePath = () => {
            trailsRef.current.forEach((path, index) => {
                if (!path) return;
                let points = path.points || [];
                points.unshift({ ...smoothPointer.current });
                while (points.length > totalPointsArray[index]) {
                    points.pop();
                }
                path.points = points;

                if (points.length > 1) {
                    let d = `M ${points[0].x} ${points[0].y} `;
                    for (let i = 1; i < points.length; i++) {
                        d += `L ${points[i].x} ${points[i].y} `;
                    }
                    path.setAttribute("d", d);
                }
            });
            requestAnimationFrame(updatePath);
        };
        updatePath();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {["#cc007f", "#e62091", "#ff30a4", "#ff48b5", "#ff60c6", "#ff78d7", "#ff90e8"].map((color, index) => (
                <svg key={index} className="absolute inset-0 w-full h-full">
                    <path ref={(el) => (trailsRef.current[index] = el)} className="trail" stroke={color} strokeWidth={50} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ))}
        </div>
    );
};

export default CursorEffect;