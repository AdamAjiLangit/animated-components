"use client";

import React from 'react';
import UniqueHamburger from '@/components/hamburger/UniqueHamburger';
import SimpleHamburger from '@/components/hamburger/SimpleHamburger';
import Button from '@/components/hamburger/Button';

const Hamburger = () => {
    return (
        <div className='flex flex-col items-center gap-10 justify-center min-h-screen'>
            <div className='flex gap-5'>
                <div className='p-5 bg-gray-200 rounded-lg'>
                    <SimpleHamburger />
                </div>
                <div className='p-3 bg-gray-200 rounded-lg'>
                    <UniqueHamburger />
                </div>
            </div>
            <Button />
        </div>
    )
}

export default Hamburger