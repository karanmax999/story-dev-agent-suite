'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.15), transparent 40%)`,
                }}
            />
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                    maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}
