
import React from 'react';

export const Logo: React.FC = () => (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="url(#paint0_linear_1_2)"/>
        <text x="50" y="27" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="bold" fill="white">
            Creator
        </text>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="40" y2="40">
                <stop stopColor="#FF7A00"/>
                <stop offset="1" stopColor="#FFAE42"/>
            </linearGradient>
        </defs>
    </svg>
);
