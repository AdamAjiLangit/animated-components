"use client";

import React from 'react';
import ThreeCircle from '@/components/3d-circle/ThreeCircle';
import Button from '@/components/hamburger/Button';

const AnimatedCircle = () => {
    return (
        <>
            <ThreeCircle />
            <div className='absolute top-0 left-0 p-4'>
                <Button />
            </div>
        </>
    )
}

export default AnimatedCircle