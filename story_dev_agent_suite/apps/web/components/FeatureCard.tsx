'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: any; // LucideIcon might conflict with React 19 types
    children?: any; // ReactNode might conflict
    className?: string; // Add className prop
}

export default function FeatureCard({ title, description, icon: Icon, children, className }: FeatureCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-indigo-500/50 transition-colors group ${className || ''}`}
        >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <Icon className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>
            {children}
        </motion.div>
    );
}
