'use client';

import { useState } from 'react';

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to generate');
            setResult(data);
        } catch (err: any) {
            console.error(err);
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-zinc-900 to-black text-white">
            <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                ABV GenAI Agent
            </h1>
            <p className="mb-12 text-zinc-400">Generate content & automatically register IP on Story Protocol</p>

            <div className="w-full max-w-2xl">
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-32 p-4 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none text-lg"
                        placeholder="Describe what you want to generate..."
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="absolute bottom-4 right-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : 'Generate & Register'}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
                            <h3 className="text-lg font-semibold mb-2 text-purple-400">Generated Content</h3>
                            <p className="text-zinc-200">{result.content}</p>
                        </div>

                        <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
                            <h3 className="text-lg font-semibold mb-2 text-green-400">IP Registration Successful</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-zinc-500 block">IP Asset ID</span>
                                    <span className="font-mono text-zinc-300">{result.ipId}</span>
                                </div>
                                <div>
                                    <span className="text-zinc-500 block">Transaction Hash</span>
                                    <span className="font-mono text-zinc-300">{result.txHash}</span>
                                </div>
                            </div>
                            <a
                                href={`https://explorer.story.foundation/ipa/${result.ipId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 text-purple-400 hover:text-purple-300 underline"
                            >
                                View on Story Explorer
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
