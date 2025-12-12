import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'; // Use raw SDK
import { http, createWalletClient, account } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const PRIVATE_KEY = '0x4b9f154f06525e0e6f987be37a7bbcb4541843dbd9ca375acb2653b593c2657d';
const RPC_URL = 'https://aeneid.storyrpc.io';

async function main() {
    console.log("Initializing SDK...");
    const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);

    // Setup StoryClient using Core SDK directly
    // This avoids dependency on my own wrapper which might have issues
    const client = StoryClient.newClient({
        account: account,
        transport: http(RPC_URL),
        chainId: 1315 // Aeneid
    });

    console.log("Deploying SPG Collection...");
    try {
        const newCollection = await client.nftClient.createNFTCollection({
            name: "GenAI Demo Assets",
            symbol: "GENAI",
            isPublicMinting: true,
            mintOpen: true,
            contractURI: '',
            baseURI: '',
            mintFeeRecipient: account.address,
        });

        console.log("---------------------------------------------------");
        console.log("SUCCESS! Collection Deployed.");
        console.log("SPG Contract Address:", newCollection.spgNftContract);
        console.log("---------------------------------------------------");
    } catch (e) {
        console.error("Deployment Failed:", e);
    }
}

main();
