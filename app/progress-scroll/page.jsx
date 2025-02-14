"use client";

import React from 'react';
import ProgressScrolls from '@/components/progress-scroll/ProgressScroll';
import Button from '@/components/hamburger/Button';

const ProgressScroll = () => {
    return (
        <div className='h-[300vh] w-full'>
            <ProgressScrolls />
            <div className='fixed bottom-1/2 right-1/2'>
                <Button />
            </div>
        </div>
    )
}

export default ProgressScroll