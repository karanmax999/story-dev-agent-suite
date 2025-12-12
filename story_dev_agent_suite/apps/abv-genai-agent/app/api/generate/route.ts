// import "@/lib/instrumentation";

import { NextResponse } from 'next/server';
import { StoryClient } from 'story-client';
import { ABVClient } from "@abvdev/client";
import { startActiveObservation } from "@abvdev/tracing";

// Initialize Story client
const PRIVATE_KEY = process.env.STORY_PRIVATE_KEY || '0x4b9f154f06525e0e6f987be37a7bbcb4541843dbd9ca375acb2653b593c2657d';
const DEFAULT_NFT_CONTRACT = "0x1C3EB77932FF5a3881591Ed1B6208F2F96Faaa22"; // User's Deployed SPG Collection

const storyClient = new StoryClient({
    rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
    privateKey: PRIVATE_KEY as `0x${string}`,
});

const API_KEY = process.env.ABV_API_KEY || "sk-abv-4b2194c0-6a08-4b4b-a509-a63bf0ed78f3";

// Initialize ABV client
const abv = new ABVClient({
    apiKey: API_KEY,
    baseUrl: "https://app.abv.dev",
});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        console.log(`[DEBUG] Keys Configured - API: ${!!API_KEY}, Wallet: ${!!PRIVATE_KEY}`);

        let generatedContent = "";

        let tags: string[] = [];

        if (API_KEY) {
            // 1. Generate content via ABV Gateway (Traced)
            console.log("Generating content via ABV Gateway...");
            try {
                const response = await abv.gateway.chat.completions.create({
                    provider: "openai",
                    model: "gpt-4",
                    messages: [{
                        role: "user",
                        content: `Generate a JSON response with the following structure: { "description": "A highly detailed visual description...", "tags": ["tag1", "tag2", "style_tag"] } based on this concept: ${prompt}`
                    }]
                });

                const rawContent = response.choices[0]?.message?.content || "{}";
                // Clean up markdown code blocks if present
                const cleanContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

                try {
                    const parsed = JSON.parse(cleanContent);
                    generatedContent = parsed.description || rawContent;
                    tags = parsed.tags || [];
                } catch (e) {
                    generatedContent = rawContent; // Fallback to raw text
                }
            } catch (err: any) {
                console.error("ABV Generation Error:", err);
                generatedContent = "Error generating content. Using fallback description.";
            }
        } else {
            // ... mock ...
            await new Promise(resolve => setTimeout(resolve, 2000));
            generatedContent = "Simulated Description: A glowing futuristic cityscape with neon blue accents.";
            tags = ["#Cyberpunk", "#Neon", "#Future"];
        }

        console.log("Content generated:", generatedContent.substring(0, 50) + "...");

        // 2. Register IP on Story (or Simulate)
        const mockMetadataUri = `https://ipfs.io/ipfs/QmPlaceholder/${encodeURIComponent(prompt.substring(0, 20))}`;

        let ipId = '';
        let txHash = '';

        // Use the unified PRIVATE_KEY constant
        // Note: We check if it's the 'zero' placeholder just in case, but here we have a real default.
        if (PRIVATE_KEY && !PRIVATE_KEY.startsWith('0x000')) {
            const nftContract = process.env.STORY_NFT_CONTRACT_ADDRESS || DEFAULT_NFT_CONTRACT;

            if (nftContract) {
                try {
                    console.log(`Attempting Registration with Key: ${PRIVATE_KEY.substring(0, 6)}... and Contract: ${nftContract}`);
                    const regResult = await storyClient.registerIpAsset({
                        metadataUri: mockMetadataUri,
                        tokenContractAddress: nftContract
                    });
                    ipId = (regResult as any).ipId || '0x...';
                    txHash = (regResult as any).txHash || (regResult as any).transactionHash || '0x...';
                    console.log(`Real IP Registered: ${ipId}`);
                } catch (e) {
                    console.error("Story registration failed (Real Key):", e);
                    // Fallback to mock on error to keep demo alive
                    ipId = "0x" + Array(40).fill('0').map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                    txHash = "0x" + Array(64).fill('0').map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                    console.log("Falling back to Mock IP ID due to error.");
                }
            } else {
                console.warn("No NFT Contract Address found. Simulating registration.");
                ipId = "0x" + Array(40).fill('0').map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                txHash = "0x" + Array(64).fill('0').map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            }
        } else {
            console.log("No valid private key found. Simulating IP Registration for Demo...");
            // Generate valid-looking Mock Data
            ipId = "0x1234567890abcdef1234567890abcdef12345678";
            txHash = "0x" + Array(64).fill('0').map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        }

        return NextResponse.json({
            content: generatedContent,
            tags,
            ipId,
            txHash
        });

    } catch (error: any) {
        console.error('Generation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
