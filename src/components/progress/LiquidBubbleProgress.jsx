'use client';

import { useEffect, useState } from 'react';

export default function LiquidBubbleProgress({ completedTasks = 0, totalTasks = 1 }) {
    const targetPercentage = Math.round((completedTasks / totalTasks) * 100);

    const [currentPercentage, setCurrentPercentage] = useState(0);

    useEffect(() => {
        let animationFrame;
        const animate = () => {
            setCurrentPercentage(prev => {
                if (prev < targetPercentage) {
                    return Math.min(prev + 1, targetPercentage);
                } else if (prev > targetPercentage) {
                    return Math.max(prev - 1, targetPercentage);
                }
                return prev;
            });
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, [targetPercentage]);

    const colorClass = currentPercentage < 20
        ? 'darkred'
        : currentPercentage < 40
            ? 'orangered'
            : currentPercentage < 60
                ? 'gold'
                : currentPercentage < 80
                    ? 'limegreen'
                    : 'green';

    return (
        <div
            className={`wrapper ${colorClass}`}
            style={{
                '--percentage': `${targetPercentage}%`,
                '--current-percentage': `${currentPercentage}%`,
                '--border-color': colorClass,
            }}
        >
            <div className="progress-ring"></div>

            <div>
                <div className="progress">
                    <div className="inner">
                        <div className="percent">
                            <span>{targetPercentage}</span>%
                        </div>
                        <div
                            className="water"
                            style={{
                                top: `${100 - targetPercentage}%`,
                            }}
                        ></div>
                        <div className="glare"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
