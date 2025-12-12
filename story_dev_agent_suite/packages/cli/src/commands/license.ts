import chalk from 'chalk';
import ora from 'ora';
import { StoryClient } from 'story-client';
import { loadConfig } from '../utils/config';

interface CreateLicenseOptions {
    type: 'commercial' | 'non-commercial';
    royalty: string;
    transferable: boolean;
}

interface AttachLicenseOptions {
    ipId: string;
    licenseId: string;
}

interface MintLicenseOptions {
    ipId: string;
    amount: string;
    receiver?: string;
}

async function createLicense(options: CreateLicenseOptions) {
    const spinner = ora('Creating license terms...').start();

    try {
        const config = loadConfig();
        const client = new StoryClient({
            rpcUrl: config.RPC_URL || 'https://aeneid.storyrpc.io',
            privateKey: config.PRIVATE_KEY as `0x${string}`
        });

        const result = await client.createLicenseTerms({
            type: options.type,
            commercialRevShare: parseInt(options.royalty)
        });

        spinner.succeed(chalk.green('License terms created!'));

        console.log(chalk.cyan('\n📜 License Details:\n'));
        console.log(chalk.white(`  License ID: ${chalk.bold((result as any).licenseTermsId)}`));
        console.log(chalk.white(`  Type: ${chalk.bold(options.type)}`));
        console.log(chalk.white(`  Royalty: ${chalk.bold(options.royalty)}%`));
        console.log(chalk.white(`  TX Hash: ${chalk.bold((result as any).txHash)}\n`));

    } catch (error: any) {
        spinner.fail(chalk.red('Failed to create license'));
        console.error(chalk.red(`\n${error.message}\n`));
        process.exit(1);
    }
}

async function attachLicense(options: AttachLicenseOptions) {
    const spinner = ora('Attaching license to IP...').start();

    try {
        const config = loadConfig();
        const client = new StoryClient({
            rpcUrl: config.RPC_URL || 'https://aeneid.storyrpc.io',
            privateKey: config.PRIVATE_KEY as `0x${string}`
        });

        const result = await client.attachLicenseToIp({
            ipId: options.ipId as any,
            licenseTermsId: options.licenseId as any
        });

        spinner.succeed(chalk.green('License attached!'));

        console.log(chalk.cyan('\n✅ Attachment Details:\n'));
        console.log(chalk.white(`  IP ID: ${chalk.bold(options.ipId)}`));
        console.log(chalk.white(`  License ID: ${chalk.bold(options.licenseId)}`));
        console.log(chalk.white(`  TX Hash: ${chalk.bold((result as any).txHash)}\n`));

    } catch (error: any) {
        spinner.fail(chalk.red('Failed to attach license'));
        console.error(chalk.red(`\n${error.message}\n`));
        process.exit(1);
    }
}

async function mintLicense(options: MintLicenseOptions) {
    const spinner = ora('Minting license tokens...').start();

    try {
        const config = loadConfig();
        const client = new StoryClient({
            rpcUrl: config.RPC_URL || 'https://aeneid.storyrpc.io',
            privateKey: config.PRIVATE_KEY as `0x${string}`
        });

        // Use configured address as receiver if not specified
        const receiver = options.receiver || config.ADDRESS || '';

        const result = await client.mintLicenseToken({
            ipId: options.ipId as any,
            licenseTermsId: '1' as any,
            amount: parseInt(options.amount),
            receiver: receiver as any
        });

        spinner.succeed(chalk.green('License tokens minted!'));

        console.log(chalk.cyan('\n🎫 Mint Details:\n'));
        console.log(chalk.white(`  Amount: ${chalk.bold(options.amount)}`));
        console.log(chalk.white(`  Receiver: ${chalk.bold(receiver)}`));
        console.log(chalk.white(`  TX Hash: ${chalk.bold((result as any).txHash)}\n`));

    } catch (error: any) {
        spinner.fail(chalk.red('Failed to mint license tokens'));
        console.error(chalk.red(`\n${error.message}\n`));
        process.exit(1);
    }
}

export const licenseCommand = {
    create: createLicense,
    attach: attachLicense,
    mint: mintLicense
};
