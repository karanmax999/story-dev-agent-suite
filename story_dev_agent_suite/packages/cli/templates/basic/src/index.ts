import { StoryClient } from 'story-client';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    console.log('🚀 Story Protocol Client Example\n');

    // Initialize client
    const client = new StoryClient({
        rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
        privateKey: process.env.STORY_PRIVATE_KEY as `0x${string}`
    });

    console.log('✅ Client initialized\n');

    // Example: Register an IP Asset
    try {
        console.log('📝 Registering IP Asset...');

        const result = await client.registerIpAsset({
            metadataUri: 'https://example.com/metadata.json',
            // Optional: provide NFT contract and token ID
            // tokenContractAddress: '0x...',
            // tokenId: '1'
        });

        console.log('✅ IP Asset registered!');
        console.log(`   IP ID: ${(result as any).ipId}`);
        console.log(`   TX Hash: ${(result as any).txHash}\n`);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

main().catch(console.error);
