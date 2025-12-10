// Import instrumentation FIRST for tracing
import "../../../lib/instrumentation";

import { NextResponse } from 'next/server';
import { StoryClient } from 'story-client';
import { ABVClient } from "@abvdev/client";
import { startActiveObservation } from "@abvdev/tracing";

// Initialize Story client
const storyClient = new StoryClient({
    rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
    privateKey: (process.env.STORY_PRIVATE_KEY as `0x${string}`) || '0x0000000000000000000000000000000000000000000000000000000000000000',
});

// Initialize ABV client
const abv = new ABVClient({
    apiKey: process.env.ABV_API_KEY,
    baseUrl: "https://app.abv.dev",
});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        if (!process.env.ABV_API_KEY) {
            throw new Error('ABV_API_KEY is not configured');
        }

        // 1. Generate content via ABV Gateway (Traced)
        console.log("Generating content via ABV Gateway...");
        // Types might be generic if not strictly typed in beta, but following snippet
        const response = await abv.gateway.chat.completions.create({
            provider: "openai", // As per snippet
            model: "gpt-4",    // As per snippet
            messages: [{ role: "user", content: prompt }]
        });

        const generatedContent = response.choices[0]?.message?.content || "No content generated";
        console.log("Content generated:", generatedContent.substring(0, 50) + "...");

        // 2. Register IP on Story
        // We'll use our StoryClient for this since the ABV SDK snippet didn't show native registration commands yet.
        const mockMetadataUri = `https://ipfs.io/ipfs/QmPlaceholder/${encodeURIComponent(prompt.substring(0, 20))}`;

        let ipId = '';
        let txHash = '';

        if (process.env.STORY_PRIVATE_KEY && !process.env.STORY_PRIVATE_KEY.startsWith('0x000')) {
            const nftContract = process.env.STORY_NFT_CONTRACT_ADDRESS;

            if (nftContract) {
                // Register existing NFT or Mint & Register if supported by client
                // Our client supports mintAndRegister if tokenContract is SPG-compatible
                try {
                    const regResult = await storyClient.registerIpAsset({
                        metadataUri: mockMetadataUri,
                        tokenContractAddress: nftContract
                    });
                    ipId = (regResult as any).ipId || '0x...';
                    txHash = (regResult as any).txHash || (regResult as any).transactionHash || '0x...';
                    console.log(`IP Registered: ${ipId}`);
                } catch (e) {
                    console.error("Story registration failed:", e);
                    ipId = "Failed to Register";
                }
            } else {
                ipId = "Skipped (No NFT Contract)";
            }
        } else {
            ipId = "Skipped (No Private Key)";
        }

        return NextResponse.json({
            content: generatedContent,
            ipId,
            txHash
        });

    } catch (error: any) {
        console.error('Generation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
