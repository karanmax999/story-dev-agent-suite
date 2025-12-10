import { NextResponse } from 'next/server';
import { StoryClient } from 'story-client';

const client = new StoryClient({
    rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
    privateKey: (process.env.STORY_PRIVATE_KEY as `0x${string}`) || '0x0000000000000000000000000000000000000000000000000000000000000000',
});

export async function POST(request: Request) {
    try {
        const { ipId, licenseTermsId } = await request.json();

        if (process.env.STORY_PRIVATE_KEY?.startsWith('0x000')) {
            return NextResponse.json({ success: true }); // Mock
        }

        await client.attachLicenseToIp({ ipId, licenseTermsId });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Attach license error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
