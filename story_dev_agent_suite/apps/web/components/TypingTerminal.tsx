'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const lines = [
    { text: "$ npx story-dev-agent init", color: "text-green-400" },
    { text: "> 🚀 Scaffolding your AI Agent...", color: "text-white" },
    { text: "> ✅ Story Client installed", color: "text-blue-400" },
    { text: "> ✅ Aeneid Testnet configured", color: "text-blue-400" },
    { text: "> 📦 Ready to ship!", color: "text-green-400" },
];

export default function TypingTerminal() {
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        if (lineIndex < lines.length - 1) {
            const timeout = setTimeout(() => {
                setLineIndex((prev) => prev + 1);
            }, 800); // Speed of typing new lines
            return () => clearTimeout(timeout);
        }
    }, [lineIndex]);

    return (
        <div className="w-full max-w-lg mx-auto bg-[#1E1E2E] rounded-xl shadow-2xl border border-white/10 overflow-hidden font-mono text-sm relative z-10">
            {/* Terminal Header */}
            <div className="bg-[#27273A] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-auto text-xs text-gray-500">zsh -- 80x24</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-2 h-[200px]">
                {lines.slice(0, lineIndex + 1).map((line, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${line.color}`}
                    >
                        {line.text}
                    </motion.div>
                ))}

                {/* Blinking Cursor */}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-gray-400 inline-block align-middle ml-1"
                />
            </div>
        </div>
    );
}
