import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import chalk from 'chalk';

const CONFIG_DIR = path.join(os.homedir(), '.story-dev-agent');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

interface Config {
    PRIVATE_KEY?: string;
    RPC_URL?: string;
    ADDRESS?: string;
    ABV_API_KEY?: string;
}

export function loadConfig(): Config {
    try {
        fs.ensureDirSync(CONFIG_DIR);

        if (!fs.existsSync(CONFIG_FILE)) {
            return {};
        }

        return fs.readJsonSync(CONFIG_FILE);
    } catch (error) {
        return {};
    }
}

export function saveConfig(config: Config): void {
    fs.ensureDirSync(CONFIG_DIR);
    fs.writeJsonSync(CONFIG_FILE, config, { spaces: 2 });
}

export function configCommand(action: string, key?: string, value?: string) {
    const config = loadConfig();

    switch (action) {
        case 'set':
            if (!key || !value) {
                console.log(chalk.red('\n❌ Usage: story-dev-agent config set <key> <value>\n'));
                return;
            }

            config[key as keyof Config] = value;
            saveConfig(config);
            console.log(chalk.green(`\n✅ Set ${key} = ${value.substring(0, 10)}...\n`));
            break;

        case 'get':
            if (!key) {
                console.log(chalk.red('\n❌ Usage: story-dev-agent config get <key>\n'));
                return;
            }

            const val = config[key as keyof Config];
            if (val) {
                console.log(chalk.cyan(`\n${key}: ${val}\n`));
            } else {
                console.log(chalk.yellow(`\n⚠️  ${key} not set\n`));
            }
            break;

        case 'list':
            console.log(chalk.cyan('\n📋 Configuration:\n'));

            if (Object.keys(config).length === 0) {
                console.log(chalk.yellow('  No configuration set\n'));
            } else {
                Object.entries(config).forEach(([k, v]) => {
                    const displayValue = k.includes('KEY') || k.includes('PRIVATE')
                        ? `${v.substring(0, 10)}...`
                        : v;
                    console.log(chalk.white(`  ${k}: ${displayValue}`));
                });
                console.log();
            }
            break;

        default:
            console.log(chalk.red('\n❌ Invalid action. Use: set, get, or list\n'));
    }
}
