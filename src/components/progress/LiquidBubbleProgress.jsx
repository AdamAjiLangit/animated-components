'use client'

import React from "react";

const LiquidBubbleProgress = ({ completedTasks = 0, totalTasks = 1 }) => {
    const percentage = Math.round((completedTasks / totalTasks) * 100);

    const getColorClass = () => {
        if (percentage < 20) return "darkred";        // 0–19%
        if (percentage < 40) return "orangered";      // 20–39%
        if (percentage < 60) return "gold";           // 40–59%
        if (percentage < 80) return "limegreen";      // 60–79%
        return "green";                               // 80–100%

    };

    return (
        <div className="wrapper">
            <div className={getColorClass()}>
                <div className="progress">
                    <div className="inner">
                        <div className="percent">
                            <span>{percentage}</span>%
                        </div>
                        <div
                            className="water"
                            style={{ top: `${100 - percentage}%` }}
                        ></div>
                        <div className="glare"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiquidBubbleProgress;
