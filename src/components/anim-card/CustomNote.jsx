import React from 'react';

const CustomNote = ({ text, color }) => {
    const colorMap = {
        blue: 'border-blue-500',
        green: 'border-green-500',
        red: 'border-red-500',
        orange: 'border-orange-500',
        yellow: 'border-yellow-500',
        purple: 'border-purple-500',
    };

    const borderColorClass = colorMap[color] || 'border-blue-500';

    return (
        <div className={`rounded-full w-fit bg-white py-1 px-3 border-[3px] ${borderColorClass} flex items-center gap-2`}>
            <p className='text-sm font-medium'>{text}</p>
        </div>
    );
}

export default CustomNote;
