import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ProgressScrolls = () => {
    const circleRef = useRef(null);
    const svgRef = useRef(null);

    useEffect(() => {
        const path = svgRef.current.querySelector('path');

        gsap.to(circleRef.current, {
            duration: 5,
            motionPath: {
                path: path,
                align: path,
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 1
            },
            scrollTrigger: {
                trigger: svgRef.current,
                start: 'top top',
                end: '+=150k%',
                scrub: true,
            },
            ease: 'none'
        });
    }, []);

    return (
        <div className="fixed -top-20 left-0 w-full h-full flex items-center justify-center">
            <svg
                ref={svgRef}
                width="400"
                height="600"
                viewBox="0 0 400 600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
            >
                {/* Road Path */}
                <path
                    d="M 200 0 
                       V 100 
                       Q 200 140 240 140 
                       H 350 
                       Q 380 140 380 180 
                       V 250 
                       Q 380 290 340 290 
                       H 80
                       Q 40 290 40 330
                       V 400
                       Q 40 440 80 440
                       H 300
                       Q 340 440 340 480
                       V 560"
                    stroke="black"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Dashed Line */}
                {/* <path
                    d="M 200 0 
                       V 100 
                       Q 200 140 240 140 
                       H 350 
                       Q 380 140 380 180 
                       V 250 
                       Q 380 290 340 290 
                       H 80
                       Q 40 290 40 330
                       V 400
                       Q 40 440 80 440
                       H 300
                       Q 340 440 340 480
                       V 560"
                    stroke="white"
                    strokeWidth="4"
                    strokeDasharray="15 10"
                    fill="none"
                    strokeLinecap="round"
                /> */}
            </svg>

            {/* Moving Circle */}
            <div ref={circleRef} className="absolute top-0 left-0 text-blue-500">
                <div className='p-3 bg-[#ff90e8] rounded-full'></div>
            </div>
        </div>
    );
};

export default ProgressScrolls;
