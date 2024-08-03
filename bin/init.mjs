#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, '../templates');

const questions = [
  {
    type: 'list',
    name: 'language',
    message: 'Choose the language for your project:',
    choices: ['JavaScript', 'TypeScript'],
  },
  {
    type: 'list',
    name: 'database',
    message: 'Choose the database for your project:',
    choices: [
      { name: 'Mongoose', value: 'mongoose' },
      { name: 'Prisma (not supported yet)', value: 'prisma', disabled: true },
    ],
  },
];

inquirer.prompt(questions).then((answers) => {
  const { language, database } = answers;
  const templateDir = path.join(templatesDir, language.toLowerCase());

  const args = process.argv.slice(2);
  const appName = args[0] || 'my-server';

  const targetDir = path.join(process.cwd(), appName);

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${appName}" already exists.`);
    process.exit(1);
  }

  const spinner = ora(`Initializing ${language} project with ${database} in directory "${appName}"...`).start();

  fs.copy(templateDir, targetDir)
    .then(() => {
      spinner.succeed('Project initialized successfully!');

      spinner.start('Setting up server directory...');
      const serverDir = path.join(targetDir, '.server');
      fs.ensureDirSync(serverDir);
      const serverFile = language === 'JavaScript' ? 'index.js' : 'index.ts';
      fs.writeFileSync(path.join(serverDir, serverFile), `import '../index.mjs';`); // Pointing to main entry
      spinner.succeed('Server directory set up!');

      spinner.start('Adding custom scripts...');
      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = fs.readJsonSync(packageJsonPath);
      packageJson.scripts = {
        ...packageJson.scripts,
        build: 'epicjs build',
        start: 'epicjs start',
        dev: 'epicjs dev',
        test: 'epicjs test',
      };
      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
      spinner.succeed('Custom scripts added!');

      spinner.start('Installing dependencies...');
      execSync(`cd ${targetDir} && npm install`);
      if (language === 'TypeScript') {
        execSync(`cd ${targetDir} && npm install ts-node typescript nodemon --save-dev`);
      } else {
        execSync(`cd ${targetDir} && npm install nodemon --save-dev`);
      }
      spinner.succeed('Dependencies installed!');

      console.log('All set! You can now run `npm run dev` to start development.');
    })
    .catch((err) => {
      spinner.fail('Error initializing project.');
      console.error('Error initializing project:', err);
    });
});
