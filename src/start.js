const {Command, Option} = require('commander')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')

const {isSafeToCreateProjectIn, info, documentation} = require('./utils.js')
const {templates, defaultTemplate } = require('./templates')

const packageJson = require('../package.json');
const {start} = require('repl');

let projectName;

function main() {
  const program = new Command(packageJson.name)
  const startTime = new Date().getTime()

  program.version(packageJson.version, '-v, --version', 'output the current version')
    .arguments('<project-name>')
    .usage(`${chalk.green('project-name')} [options]`)
    .action(pname => projectName = pname)
    .addOption(
      new Option('-t, --template <template>', 'base for the project')
        .choices(Object.keys(templates).sort())
        .default(defaultTemplate)
    )
    .allowUnknownOption()
    .on('--help', () => {

      documentation(`\nCreate Clarity Application ${packageJson.version}\n`)

      documentation(`Example: ${packageJson.name} my-application --template ${Object.keys(templates)[Math.floor(Math.random() * Object.keys(templates).length)]}\n`)

      documentation(`You may select one of the templates below by passing -t or --template argument:`)

      Object.keys(templates).sort().forEach((template) => {
        documentation(`\t - ${template} ${defaultTemplate === template ? `${chalk.yellow('[default]')}`: ''}`)
      })

      documentation(`\n`);

    })
    .parse(process.argv)

  const options = program.opts();

  const root = path.resolve(projectName);
  const appName = path.basename(root);

  fs.ensureDirSync(projectName);
  if (!isSafeToCreateProjectIn(root, projectName)) {
    process.exit(1);
  }

  info(`New Clarity app in ${chalk.green(root)}`);

  const originalDirectory = process.cwd();
  process.chdir(root);

  // root - created folder
  // originalDirectory - execution directory
  const instructions = require(templates[options.template]);
  instructions(root, appName, '1.0.0', originalDirectory);

  info(`Runtime time: ${new Date().getTime() - startTime} ms`)
}

module.exports = {
  main
}