import chalk from 'chalk';
import ora from 'ora';
import { StoryClient } from 'story-client';
import { loadConfig } from '../utils/config';

interface RegisterOptions {
    metadataUri: string;
    nftContract?: string;
    tokenId?: string;
}

export async function registerCommand(options: RegisterOptions) {
    const spinner = ora('Initializing Story Client...').start();

    try {
        const config = loadConfig();

        if (!config.PRIVATE_KEY) {
            spinner.fail(chalk.red('Private key not configured'));
            console.log(chalk.yellow('\nSet your private key using:'));
            console.log(chalk.cyan('  story-dev-agent config set PRIVATE_KEY 0x...\n'));
            return;
        }

        const client = new StoryClient({
            rpcUrl: config.RPC_URL || 'https://aeneid.storyrpc.io',
            privateKey: config.PRIVATE_KEY as `0x${string}`
        });

        spinner.text = 'Registering IP Asset...';

        const result = await client.registerIpAsset({
            metadataUri: options.metadataUri,
            tokenContractAddress: options.nftContract as any,
            tokenId: options.tokenId
        });

        spinner.succeed(chalk.green('IP Asset registered!'));

        console.log(chalk.cyan('\n📋 Registration Details:\n'));
        console.log(chalk.white(`  IP ID: ${chalk.bold((result as any).ipId)}`));
        console.log(chalk.white(`  TX Hash: ${chalk.bold((result as any).txHash || (result as any).transactionHash)}`));
        console.log(chalk.white(`\n  View on Explorer:`));
        console.log(chalk.cyan(`  https://aeneid.explorer.story.foundation/ipa/${(result as any).ipId}\n`));

    } catch (error: any) {
        spinner.fail(chalk.red('Registration failed'));
        console.error(chalk.red(`\n${error.message}\n`));
        process.exit(1);
    }
}
