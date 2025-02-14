"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const HomeCard = dynamic(() => import('@/components/home/HomeCard'), {
  ssr: false, loading: () => (
    <div className='flex h-[250px] w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
});

const Page = () => {
  return (
    <>
      <div className='flex flex-col gap-5 min-h-screen my-10 items-center justify-center'>
        <h1 className='text-2xl font-semibold'>Animated Component List</h1>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <HomeCard title="3D Card Hover" desc="Card memunculkan 3d item saat dihover" href="/card-3d" />
          <HomeCard title="Animated Hamburger" desc="Menu Hamburger" href="/hamburger" />
          <HomeCard title="Cursor Trail Effect" desc="Cursor dengan efek buntut" href="/cursor-effect" />
          <HomeCard title="Progress Line Scroll" desc="Garis Progress dengan tanda lingkaran" href="/progress-scroll" />
          <HomeCard title="3D Circle Animation" desc="3D bola dari atas menuju tengah halaman dan berputar beberapa detik lalu kembali" href="/3d-circle" />
          <HomeCard title="Waves Background Animation" desc="Efek wave background dengan cursor sebagai trigger" href="/wave-background" />
          <HomeCard title="3D Scroll" desc="3D model akan mendekat dengan menggunakan camera dan scroll sebagai trigger" href="/3d-scroll" />
        </div>
      </div>
    </>
  )
};

export default Page;