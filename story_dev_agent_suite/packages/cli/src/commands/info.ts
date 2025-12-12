import chalk from 'chalk';

export async function infoCommand(ipId: string) {
    console.log(chalk.cyan('\n📊 IP Asset Information:\n'));
    console.log(chalk.white(`  IP ID: ${chalk.bold(ipId)}`));
    console.log(chalk.white(`  Explorer: ${chalk.cyan(`https://aeneid.explorer.story.foundation/ipa/${ipId}`)}`));
    console.log(chalk.yellow('\n  ℹ️  Detailed on-chain queries coming soon!\n'));
}
