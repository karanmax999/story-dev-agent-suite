import { StoryClient } from '../packages/story-client/src/client';
import { privateKeyToAccount } from 'viem/accounts';
import * as dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY = '0x4b9f154f06525e0e6f987be37a7bbcb4541843dbd9ca375acb2653b593c2657d';

async function main() {
    console.log("Initializing Story Client...");
    const client = new StoryClient({
        rpcUrl: 'https://aeneid.storyrpc.io',
        privateKey: PRIVATE_KEY as `0x${string}`,
    });

    console.log("Deploying new SPG NFT Collection...");
    try {
        const collection = await client.createNFTCollection({
            name: "GenAI Demo Assets",
            symbol: "GENAI",
            isPublic: true
        });

        console.log("SUCCESS! Collection Deployed.");
        console.log("New SPG Contract Address:", collection.spgNftContract);
        console.log("Please update route.ts with this address.");
    } catch (e) {
        console.error("Deployment Failed:", e);
    }
}

main();
