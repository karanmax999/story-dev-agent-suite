#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { registerCommand } from './commands/register';
import { licenseCommand } from './commands/license';
import { configCommand } from './utils/config';
import { infoCommand } from './commands/info';
import { explorerCommand } from './commands/explorer';

const program = new Command();

program
    .name('story-dev-agent')
    .description('CLI tool for Story Protocol development')
    .version('1.0.0');

// Init command - scaffold new projects
program
    .command('init [project-name]')
    .description('Initialize a new Story Protocol project')
    .option('-t, --template <type>', 'Template type (basic|genai-agent|ip-sandbox|full-suite)', 'basic')
    .option('--skip-install', 'Skip dependency installation')
    .action(initCommand);

// Register command - register IP assets
program
    .command('register')
    .description('Register an IP asset on Story Protocol')
    .requiredOption('-m, --metadata-uri <uri>', 'Metadata URI (IPFS or HTTP)')
    .option('-c, --nft-contract <address>', 'NFT contract address')
    .option('-t, --token-id <id>', 'Token ID')
    .action(registerCommand);

// License commands
const license = program
    .command('license')
    .description('Manage IP licenses');

license
    .command('create')
    .description('Create new license terms')
    .requiredOption('--type <type>', 'License type (commercial|non-commercial)')
    .option('--royalty <percentage>', 'Royalty percentage (0-100)', '0')
    .option('--transferable', 'Make license transferable', true)
    .action(licenseCommand.create);

license
    .command('attach')
    .description('Attach license to IP asset')
    .requiredOption('--ip-id <id>', 'IP Asset ID')
    .requiredOption('--license-id <id>', 'License Terms ID')
    .action(licenseCommand.attach);

license
    .command('mint')
    .description('Mint license tokens')
    .requiredOption('--ip-id <id>', 'IP Asset ID')
    .requiredOption('--amount <number>', 'Number of tokens to mint')
    .option('--receiver <address>', 'Receiver address (defaults to your address)')
    .action(licenseCommand.mint);

// Config command
program
    .command('config <action> [key] [value]')
    .description('Manage CLI configuration (set|get|list)')
    .action(configCommand);

// Info command
program
    .command('info <ip-id>')
    .description('Get information about an IP asset')
    .action(infoCommand);

// Explorer command
program
    .command('explorer <ip-id>')
    .description('Open IP asset in Story Explorer')
    .action(explorerCommand);

// Error handling
program.on('command:*', () => {
    console.error(chalk.red(`\nInvalid command: ${program.args.join(' ')}`));
    console.log(chalk.yellow('See --help for a list of available commands.\n'));
    process.exit(1);
});

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
