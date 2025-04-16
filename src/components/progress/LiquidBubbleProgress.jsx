'use client'

import React from "react";

const LiquidBubbleProgress = ({ completedTasks = 0, totalTasks = 1 }) => {
    const percentage = Math.round((completedTasks / totalTasks) * 100);

    const getColorClass = () => {
        if (percentage < 33) return "red";
        if (percentage < 66) return "orange";
        return "green";
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
