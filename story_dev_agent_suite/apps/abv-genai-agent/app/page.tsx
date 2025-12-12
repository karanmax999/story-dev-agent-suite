'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Box, ArrowLeft, Loader2, Fingerprint } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const SAMPLE_PROMPTS = [
        "A futuristic cityscape with neon lights and flying cars, digital art style, synthwave colors",
        "An ancient library where books are made of floating crystals, fantasy digital art, cinematic lighting",
        "A minimalist logo for a blockchain AI startup, vector style, indigo and cyan gradient",
        "A cute robot gardener watering plants in a space station, pixar style, 3d render",
        "Abstract data visualization of a blockchain network, node connections, dark mode, blue and purple"
    ];

    const handleRandomize = () => {
        const randomPrompt = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];
        setPrompt(randomPrompt);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            // Check content type
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to generate');
                setResult(data);
            } else {
                const text = await res.text();
                console.error("Non-JSON Response:", text);
                throw new Error(`API returned ${res.status}: ${text.substring(0, 100)}...`);
            }
        } catch (err: any) {
            console.error(err);
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050508] text-white selection:bg-indigo-500/30 relative overflow-hidden font-sans">
            {/* Dynamic Backgrounds */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />
                <div className="absolute inset-0 bg-grid opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="flex items-center justify-between mb-16">
                    <a href="http://localhost:3000" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Hub
                    </a>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-zinc-300">SYSTEM ONLINE</span>
                    </div>
                </header>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Command Center */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                    Agent Command
                                </span>
                            </h1>
                            <p className="text-zinc-400 text-lg">
                                Initialize generative sequence. Assets are automatically minted as IP on Story Protocol.
                            </p>
                        </div>

                        <SpotlightCard className="p-1">
                            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3 text-indigo-400">
                                        <Bot className="w-5 h-5" />
                                        <span className="font-mono text-sm tracking-wider uppercase">Input Parameters</span>
                                    </div>
                                    <button
                                        onClick={handleRandomize}
                                        className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Surprise Me
                                    </button>
                                </div>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full h-40 p-4 rounded-lg bg-zinc-900/50 border border-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all resize-none text-zinc-200 placeholder-zinc-600 font-mono text-sm"
                                    placeholder="// Enter prompt description..."
                                />
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs text-zinc-500 font-mono">MODEL: ABV-V1-BETA</span>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || !prompt}
                                        className="relative group px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <div className="relative flex items-center gap-2">
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                            {loading ? 'Processing...' : 'Execute Agent'}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Right: Output Display */}
                    <div className="relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {!result && !loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-sm border-dashed"
                                >
                                    <div className="text-center text-zinc-600">
                                        <Box className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p className="font-mono text-sm">AWAITING OUTPUT SIGNAL</p>
                                    </div>
                                </motion.div>
                            )}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center border border-indigo-500/30 rounded-2xl bg-indigo-500/5 backdrop-blur-sm"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse" />
                                        <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative z-10" />
                                    </div>
                                    <p className="mt-4 font-mono text-indigo-300 text-sm animate-pulse">GENERATING ASSET...</p>
                                </motion.div>
                            )}

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    {/* Generated Content Card */}
                                    <SpotlightCard className="p-8 group relative">
                                        <div className="absolute top-0 right-0 p-4 opacity-50">
                                            <Sparkles className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-zinc-500 font-mono text-xs mb-4 uppercase tracking-widest">Generative Output</h3>

                                        {result.tags && result.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {result.tags.map((tag: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                                                        {tag.startsWith('#') ? tag : `#${tag}`}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-xl text-white leading-relaxed font-light">
                                            {result.content}
                                        </p>
                                    </SpotlightCard>

                                    {/* IP Registration Data */}
                                    <div className="bg-[#0A0A0F] border border-green-500/20 rounded-xl p-6 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                                        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                                <Fingerprint className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-green-400 font-bold">IP Registered</h3>
                                                <p className="text-green-500/60 text-xs font-mono">ON-CHAIN VERIFICATION COMPLETE</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 font-mono text-sm">
                                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                <span className="text-zinc-500">Asset ID</span>
                                                <span className="text-zinc-200">{result.ipId.substring(0, 8)}...{result.ipId.substring(result.ipId.length - 6)}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                <span className="text-zinc-500">Transaction</span>
                                                <a
                                                    href={`https://aeneid.explorer.story.foundation/tx/${result.txHash}`}
                                                    target="_blank"
                                                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                                >
                                                    {result.txHash.substring(0, 8)}...
                                                </a>
                                            </div>
                                        </div>

                                        <a
                                            href={`https://aeneid.explorer.story.foundation/ipa/${result.ipId}`}
                                            target="_blank"
                                            className="mt-6 block w-full py-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-center text-sm font-medium transition-all"
                                        >
                                            View Asset on Explorer
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
