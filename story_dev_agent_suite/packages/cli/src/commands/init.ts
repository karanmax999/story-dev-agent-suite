import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';

interface InitOptions {
    template: string;
    skipInstall?: boolean;
}

export async function initCommand(projectName?: string, options?: InitOptions) {
    console.log(chalk.cyan.bold('\n🚀 Story Protocol Project Initializer\n'));

    // Get project name if not provided
    if (!projectName) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Project name:',
                default: 'my-story-app',
                validate: (input: string) => {
                    if (/^[a-z0-9-_]+$/.test(input)) return true;
                    return 'Project name can only contain lowercase letters, numbers, hyphens, and underscores';
                }
            }
        ]);
        projectName = answers.projectName;
    }

    // Interactive template selection if not provided
    let template = options?.template || 'basic';

    if (!options?.template) {
        const templateAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Choose a template:',
                choices: [
                    { name: '📦 Basic - Minimal Story Client setup', value: 'basic' },
                    { name: '🤖 GenAI Agent - AI + Story Protocol integration', value: 'genai-agent' },
                    { name: '🎮 IP Sandbox - Dashboard for IP management', value: 'ip-sandbox' },
                    { name: '🏗️  Full Suite - Complete monorepo', value: 'full-suite' }
                ]
            }
        ]);
        template = templateAnswer.template;
    }

    // Package manager selection
    const pmAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'packageManager',
            message: 'Package manager:',
            choices: ['pnpm', 'npm', 'yarn'],
            default: 'pnpm'
        }
    ]);

    const targetDir = path.join(process.cwd(), projectName!);

    // Check if directory exists
    if (fs.existsSync(targetDir)) {
        const overwrite = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: `Directory ${projectName} already exists. Overwrite?`,
                default: false
            }
        ]);

        if (!overwrite.overwrite) {
            console.log(chalk.yellow('\n❌ Aborted\n'));
            return;
        }

        fs.removeSync(targetDir);
    }

    const spinner = ora('Creating project...').start();

    try {
        // Create project directory
        fs.ensureDirSync(targetDir);

        // Copy template
        const templateDir = path.join(__dirname, '..', 'templates', template);

        if (!fs.existsSync(templateDir)) {
            spinner.fail(chalk.red(`Template "${template}" not found`));
            return;
        }

        fs.copySync(templateDir, targetDir);

        // Update package.json with project name
        const pkgPath = path.join(targetDir, 'package.json');
        if (fs.existsSync(pkgPath)) {
            const pkg = fs.readJsonSync(pkgPath);
            pkg.name = projectName;
            fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
        }

        spinner.succeed(chalk.green('Project created!'));

        // Install dependencies
        if (!options?.skipInstall) {
            const installSpinner = ora('Installing dependencies...').start();

            try {
                await execa(pmAnswer.packageManager, ['install'], {
                    cwd: targetDir,
                    stdio: 'pipe'
                });
                installSpinner.succeed(chalk.green('Dependencies installed!'));
            } catch (error) {
                installSpinner.fail(chalk.red('Failed to install dependencies'));
                console.log(chalk.yellow('\nYou can install them manually by running:'));
                console.log(chalk.cyan(`  cd ${projectName}`));
                console.log(chalk.cyan(`  ${pmAnswer.packageManager} install\n`));
            }
        }

        // Success message
        console.log(chalk.green.bold('\n✨ Project ready!\n'));
        console.log(chalk.cyan('Next steps:'));
        console.log(chalk.white(`  cd ${projectName}`));

        if (options?.skipInstall) {
            console.log(chalk.white(`  ${pmAnswer.packageManager} install`));
        }

        if (template === 'genai-agent' || template === 'full-suite') {
            console.log(chalk.white('  cp .env.example .env'));
            console.log(chalk.white('  # Add your STORY_PRIVATE_KEY and ABV_API_KEY to .env'));
        }

        console.log(chalk.white(`  ${pmAnswer.packageManager} dev\n`));

    } catch (error: any) {
        spinner.fail(chalk.red('Failed to create project'));
        console.error(chalk.red(error.message));
        process.exit(1);
    }
}
