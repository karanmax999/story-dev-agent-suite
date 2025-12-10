import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
await fs.writeFile(path.join(targetDir, 'app', 'page.tsx'), pageContent);
}
