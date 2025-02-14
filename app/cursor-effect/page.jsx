"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/hamburger/Button';

const CursorEffectComponent = dynamic(() => import('@/components/cursor-effect/CursorEffect'), { ssr: false });

const CursorEffect = () => {
    return (
        <div className='cursor'>
            <CursorEffectComponent />
            <div className='flex items-center justify-center min-h-screen'>
                <Button />
            </div>
        </div>
    )
}

export default CursorEffect