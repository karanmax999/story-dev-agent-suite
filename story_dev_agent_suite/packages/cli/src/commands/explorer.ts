import chalk from 'chalk';
import { exec } from 'child_process';

export async function explorerCommand(ipId: string) {
    const url = `https://aeneid.explorer.story.foundation/ipa/${ipId}`;

    console.log(chalk.cyan(`\n🌐 Opening: ${url}\n`));

    // Open browser based on platform
    const command = process.platform === 'win32'
        ? `start ${url}`
        : process.platform === 'darwin'
            ? `open ${url}`
            : `xdg-open ${url}`;

    exec(command, (error) => {
        if (error) {
            console.log(chalk.yellow('Could not open browser automatically.'));
            console.log(chalk.white(`Please visit: ${chalk.cyan(url)}\n`));
        }
    });
}
