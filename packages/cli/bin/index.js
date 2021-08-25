#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const program = require('commander');
const inquirer = require('inquirer');
const {execSync} = require('child_process');
const packageJson = require('../package.json');
const config = require('./config');
const header = require('./header');
const output = require('./logger');

const this = that;
test;

const log = {...output()};

const requiredVersion = packageJson.engines.node;

const cliHeader = () => {
  output('');
  log.notice(chalk`{magenta cli} v${packageJson.version}`);
};

const processSelections = (name, template) => {
  cliHeader();
  log.info(`Creating a new ${config.frameworkName} App:`);
  log.info(chalk`      name: {magenta ${name}}`);
  log.info(chalk`  template: {magenta ${template}}`);
};

const processContribSelections = (command) => {
  cliHeader();
  log.info('Running Command:');
  log.info(chalk`  name: {magenta ${command}}`);
  execSync(`yarn ${command}`, {stdio: 'inherit'});
};

const longestLen = (arr) => arr.reduce((a, b) => Math.max(a, b.name.length), 0);

const showWizard = () => {
  output(
    chalk`Welcome to ModelForge! Complete the following to create your app:\n`
  );

  const other = 'other (specify)';
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'App Name:',
        default: 'my-app',
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template:',
        choices: [
          ...config.templates.map((x) => ({
            name: `${x.name.padEnd(longestLen(config.templates), ' ')} - ${
              x.description
            }`,
            value: x.name,
            short: x.name,
          })),
          other,
        ],
      },
    ])
    .then(async (answers) => {
      let {template} = answers;
      if (template === other) {
        await inquirer
          .prompt([
            {
              type: 'input',
              name: 'templateName',
              message: 'Template Name:',
            },
          ])
          .then(({templateName}) => {
            template = templateName || 'default';
          });
      }
      processSelections(answers.name, template);
    });
};

const showContribWizard = () => {
  output(chalk`Welcome to the ModelForge Contributor Console!\n`);

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'command',
        message: 'Select a command:',
        choices: [
          ...config.contribCommands.map((x) => ({
            name: `${x.name.padEnd(
              longestLen(config.contribCommands),
              ' '
            )} - ${x.description}`,
            value: x.name,
            short: x.name,
          })),
        ],
      },
    ])
    .then(async (answers) => {
      let {command} = answers;
      if (command === 'lint') {
        await inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'fix',
              default: false,
              message: 'Attempt to fix errors?',
            },
          ])
          .then(({fix}) => {
            if (fix) {
              command = 'lint:fix';
            }
          });
      }
      if (command === 'format') {
        await inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'diff',
              default: false,
              message: 'Show differences only (dry run)?',
            },
          ])
          .then(({diff}) => {
            if (diff) {
              command = 'format:diff';
            }
          });
      }
      processContribSelections(command);
    });
};
output(header);

if (!semver.satisfies(process.version, requiredVersion)) {
  output(
    chalk.red(`\nError: Minimum Node.js version not met.`) +
      chalk.yellow(
        `\nYou are using Node.js ${process.version}, Requirement: Node.js ${requiredVersion}.` +
          `\n\nPlease visit https://nodejs.org to update your Node.js version.\n`
      )
  );
  process.exit(1);
}

program
  .command('contrib', {hidden: true})
  .description('Contributor tools.')
  .action(showContribWizard);

program
  .command('wizard')
  .description('Initialize using interactive wizard.')
  .action(showWizard);

program
  .command('init [name] [template]')
  .description('Create a new application.')
  .action((name = config.defaultAppName, template = 'default') => {
    processSelections(name, template);
  });

program
  .version(require('../package.json').version)
  .usage('<command> [options]');

program.addHelpText(
  'after',
  `
Example:
  $ npx ${packageJson.name} wizard
  $ npx ${packageJson.name} init ${config.defaultAppName}
  $ npx ${packageJson.name} init ${config.defaultAppName} dashboard`
);

program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  output(`  ${chalk.red(`\n  Unknown command ${chalk.yellow(cmd)}.`)}\n`);
});

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
