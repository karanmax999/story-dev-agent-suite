#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init.js';

const program = new Command();

program
    .name('story-dev-agent')
    .description('CLI to scaffold Story Protocol applications')
    .version('0.1.0');

program
    .command('init')
    .description('Initialize a new Story Protocol project')
    .option('-t, --template <template>', 'Template to use (basic-story, abv-genai)')
    .action((options) => {
        init(options);
    });

program.parse(process.argv);
