'use client'

import React from 'react'
import { useState, useEffect } from 'react'

const ProgressComponent = ({
  completedTasks = 0,
  totalTasks = 1,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  borderColor = '#9ca3af',
  height = '20px',
  borderRadius = '9999px',
  className = '',
  showPercentage = true
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (totalTasks > 0) {
      setProgress((completedTasks / totalTasks) * 100)
    }
  }, [completedTasks, totalTasks])

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="w-full p-[2px] pr-[2.5px]"
        style={{
          height,
          borderRadius,
          border: `1px solid ${borderColor}`
        }}
      >
        <div
          className="transition-all duration-500 h-full"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            borderRadius,
          }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm mt-1 text-right">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  )
}
// Example usage:
// <Progress progress={75} color="#10b981" showPercentage={true} />

export default ProgressComponent