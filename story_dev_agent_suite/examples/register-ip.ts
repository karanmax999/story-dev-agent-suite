import { StoryClient } from 'story-client';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const client = new StoryClient({
        rpcUrl: process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io',
        privateKey: process.env.STORY_PRIVATE_KEY as `0x${string}`,
    });

    console.log('Registering IP Asset...');
    try {
        const result = await client.registerIpAsset({
            metadataUri: 'https://ipfs.io/ipfs/QmExample',
        });
        console.log('Success!', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
