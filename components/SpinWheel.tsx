
import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';

const segments = [
    { text: '100 Votes', color: '#6366F1' },
    { text: 'Try Again', color: '#EC4899' },
    { text: '500 Votes', color: '#8B5CF6' },
    { text: 'Bonus Entry', color: '#F59E0B' },
    { text: '250 Votes', color: '#10B981' },
    { text: 'Try Again', color: '#EC4899' },
    { text: '1000 Votes', color: '#3B82F6' },
    { text: '50 Votes', color: '#EF4444' },
];
const segmentAngle = 360 / segments.length;

export const SpinWheel: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const { addToast } = useToast();

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const randomSegmentIndex = Math.floor(Math.random() * segments.length);
        const targetAngle = randomSegmentIndex * segmentAngle;
        
        // Ensure it lands in the middle of the segment
        const finalAngle = targetAngle + (segmentAngle / 2);
        
        // Add multiple full rotations for effect
        const spinRotations = 5 * 360;
        
        const totalRotation = spinRotations + finalAngle;

        // The css transition will spin backwards because we point to the top. So we negate the angle.
        setRotation(prev => prev + totalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            const prize = segments[randomSegmentIndex].text;
            addToast(`Congratulations! You won: ${prize}`, prize === 'Try Again' ? 'info' : 'success');
        }, 5000); // Must match the transition duration
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">Spin the Wheel!</h1>
            <div className="relative w-80 h-80 md:w-96 md:h-96 mb-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%-15px)] z-10" style={{
                    width: 0,
                    height: 0,
                    borderLeft: '20px solid transparent',
                    borderRight: '20px solid transparent',
                    borderTop: '30px solid #FF7A00'
                }}></div>
                <div
                    className="w-full h-full rounded-full border-8 border-white shadow-xl overflow-hidden"
                    style={{
                        transform: `rotate(-${rotation}deg)`,
                        transition: 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    }}
                >
                    {segments.map((segment, index) => (
                        <div
                            key={index}
                            className="absolute w-1/2 h-1/2 origin-bottom-right"
                            style={{
                                transform: `rotate(${index * segmentAngle}deg)`,
                                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 0)`, // Triangle
                                backgroundColor: segment.color,
                            }}
                        >
                           <div className="absolute w-full h-full flex items-center justify-center transform -rotate-90 origin-center -translate-x-1/4">
                               <span className="text-white font-bold text-sm transform -rotate-45" style={{ transform: `rotate(${segmentAngle / 2}deg) translateY(-80%)` }}>
                                    {segment.text}
                                </span>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="bg-accent text-white font-bold py-3 px-10 text-xl rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSpinning ? 'Spinning...' : 'SPIN'}
            </button>
        </div>
    );
};
