'use client'

import React from 'react'
import { useState } from 'react'
import ProgressComponent from '@/components/progress/Progress'
import BubbleProgress from '@/components/progress/LiquidBubbleProgress'
import { FaCheckCircle } from "react-icons/fa";

const Progress = () => {
    const [tasks, setTasks] = useState([
        { title: 'Membuat Background Poster', completed: true },
        { title: 'Membuat Warna Poster', completed: true },
        { title: 'Membuat Judul Poster', completed: true },
        { title: 'Membuat Deskripsi Poster', completed: false },
        { title: 'Membuat Logo Poster', completed: false },
        { title: 'Membuat QR Code', completed: false },
    ]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const handleCompleted = (index) => () => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    return (
        <div className='flex items-center justify-center gap-10 h-screen mx-10'>
            <BubbleProgress completedTasks={completedTasks} totalTasks={totalTasks} />
            <div className='flex flex-col gap-4 w-full max-w-xl'>
                {tasks.map((task, index) => (
                    <div key={index} className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2'>
                            <h4 className='text-base'>{task.title}</h4>
                            <span className='text-base text-gray-500'>
                                {task.completed ? '1' : '0'}/1
                            </span>
                            <button onClick={handleCompleted(index)} className=''>
                                {task.completed ? <FaCheckCircle className='text-green-500' /> : <FaCheckCircle className='text-gray-500' />}
                            </button>
                            {/* {task.completed && <IoCheckmarkDoneCircleOutline className='text-green-500' />}
                            <button onClick={handleCompleted(index)} className='text-blue-500 hover:underline'>Toggle</button> */}
                        </div>
                        <ProgressComponent
                            completedTasks={task.completed ? 1 : 0}
                            totalTasks={1}
                            color="#3b82f6"
                            showPercentage={false}
                            height='14px'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Progress
