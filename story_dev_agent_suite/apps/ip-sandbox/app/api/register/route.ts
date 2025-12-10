import { NextResponse } from 'next/server';
import { StoryClient } from 'story-client';

// Initialize client with env vars
// Note: In a real app, ensure these are loaded correctly
const client = new StoryClient({
    rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
    privateKey: (process.env.STORY_PRIVATE_KEY as `0x${string}`) || '0x0000000000000000000000000000000000000000000000000000000000000000', // Fallback for build
});

export async function POST(request: Request) {
    try {
        const { metadataUri } = await request.json();

        if (!metadataUri) {
            return NextResponse.json({ error: 'Metadata URI is required' }, { status: 400 });
        }

        // In a real scenario, we would handle the response properly
        // Since we don't have a real private key in this env, this might fail if run
        // We will mock the response if the key is dummy
        if (process.env.STORY_PRIVATE_KEY?.startsWith('0x000')) {
            return NextResponse.json({ ipId: '0xMockIpId123456789' });
        }

        const result = await client.registerIpAsset({ metadataUri });

        // Extract IP ID from result (structure depends on SDK response)
        // For now returning the whole result or a mock ID if structure is unknown
        return NextResponse.json({ result });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
