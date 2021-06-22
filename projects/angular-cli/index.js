/**
 * Angular CLI template
 */
const path = require('path');
const {execute, info, commandOutput, syncFiles, documentation} = require('../../src/utils')

module.exports = function AngularCLI(target, applicationName, version, sourceDirectory) {

  info(`Create new Angular CLI project ${applicationName}`)

  commandOutput(execute(`npx ng new ${applicationName} --skip-git`, {cwd: sourceDirectory}))

  info(`Install Clarity Angular wrapper @cds/angular`)

  commandOutput(execute(`npx ng add @cds/angular --skip-confirmation`, {cwd: target}))

  info(`Modify the new app`)

  syncFiles(path.join(__dirname, 'files'), target)

  // @NOTE: no need to run install here AngularCli already done that for you

  documentation('')
  documentation(`To start the project:`)
  documentation(`\t cd ${applicationName}`)
  documentation(`\t npm run start`)
  documentation('')

  info('Done')

}