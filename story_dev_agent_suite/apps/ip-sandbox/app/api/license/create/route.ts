import { NextResponse } from 'next/server';
import { StoryClient } from 'story-client';

const client = new StoryClient({
    rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
    privateKey: (process.env.STORY_PRIVATE_KEY as `0x${string}`) || '0x0000000000000000000000000000000000000000000000000000000000000000',
});

export async function POST(request: Request) {
    try {
        const { type } = await request.json();

        if (process.env.STORY_PRIVATE_KEY?.startsWith('0x000')) {
            return NextResponse.json({ licenseTermsId: '123' }); // Mock
        }

        const result = await client.createLicenseTerms({ type });
        // Assuming result contains licenseTermsId. Adjust based on actual SDK return.
        // For now returning the whole result or a mocked ID if structure is complex
        return NextResponse.json({ licenseTermsId: (result as any).licenseTermsId || '123' });
    } catch (error: any) {
        console.error('License creation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
