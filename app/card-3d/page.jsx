"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const CardComponent = dynamic(() => import('@/components/card-3d/CardComponent').then((mod) => mod.default), { ssr: false });
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false });
import { Duck } from '@/components/canvas/Examples';
import { View } from '@/components/canvas/View';

const Card3D = () => {
    const [hover, setHover] = useState(false);
    const hoverRef = useRef(null);

    useEffect(() => {
        if (hover) {
            gsap.fromTo(
                hoverRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
            );
        }
    }, [hover]);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        gsap.to(hoverRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power3.in', onComplete: () => setHover(false) });
    };

    return (
        <div className='min-h-screen flex flex-col md:flex-row items-center justify-center w-full overflow-hidden'>
            {hover && (
                <div ref={hoverRef} className='absolute -top-52 flex h-screen w-full flex-col items-center justify-center'>
                    <div className='my-12 h-48 w-full max-w-52 py-6 sm:w-1/2 md:mb-40'>
                        <View orbit className='h-full sm:h-48 sm:w-full'>
                            <Suspense fallback={null}>
                                <Duck scale={2} position={[0, -1.6, 0]} />
                                <Common color={'white'} />
                            </Suspense>
                        </View>
                    </div>
                </div>
            )}
            <CardComponent onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
    );
};

export default Card3D;
