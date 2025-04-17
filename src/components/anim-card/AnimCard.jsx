import React from 'react';
import { HiDotsVertical } from "react-icons/hi";
import CustomNote from './CustomNote';

const AnimCardComponent = () => {
    return (
        <div className="relative group p-4 rounded-xl bg-[#bfff88] w-full max-w-80 overflow-hidden shadow-lg">
            {/* Liquid Waves */}
            <div className="absolute wave-shape w-[400px] h-[400px] top-[-300px] right-[-200px] bg-[#9ded5e] opacity-60 rounded-[150px]"></div>
            <div className="absolute wave-shape w-[400px] h-[400px] top-[-295px] right-[-198px] bg-[#9ded5e] opacity-40 rounded-[150px] z-10"></div>
            <div className="absolute wave-shape w-[400px] h-[400px] top-[-290px] right-[-200px] bg-[#9ded5e] opacity-30 rounded-[150px] z-20"></div>

            {/* Card Content */}
            <div className='relative z-30'>
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='text-xl font-semibold'>Tugas Khusus A</h2>
                    <HiDotsVertical className='text-xl cursor-pointer' />
                </div>
                <div className='flex items-center justify-between mb-5'>
                    <div className='flex flex-col gap-3'>
                        <CustomNote text="On Progress" color="blue" />
                        <CustomNote text="Mata Pelajaran A" color="green" />
                    </div>
                    <div className='flex flex-col items-end gap-3'>
                        <CustomNote text="Kelompok" color="red" />
                        <CustomNote text="Materi X" color="orange" />
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='text-lg font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, nisi?</p>
                </div>
                <div className='flex items-center gap-3 mb-3'>
                    <h4 className='text-lg font-medium'>Due Date :</h4>
                    <p className='text-lg'>19-03-2025</p>
                </div>
                <button className='bg-gradient-to-t from-[#1e1aff] to-[#489dff] text-white font-semibold py-2 px-4 rounded-xl w-full flex items-center justify-center gap-2'>
                    <p className='text-lg'>Accept</p>
                </button>
            </div>
        </div>
    )
}

export default AnimCardComponent;
