/**
 * Create React App
 */
const path = require('path');
const {execute, info, commandOutput, syncFiles, npmInstallPackages} = require('../../src/utils');

module.exports = function CreateReactApp(target, applicationName, version, sourceDirectory) {

  info(`Create new "Create React App" project named ${applicationName}`);

  commandOutput(execute(`npx create-react-app ${applicationName}`, {cwd: sourceDirectory}));

  info(`Install Clarity React wrapper and Core packages`);

  npmInstallPackages([
    '@cds/core',
    '@cds/city',
    '@cds/react'
  ], target)

  info(`Modify the new app`);

  syncFiles(path.join(__dirname, 'files'), target);

  updatePackageJSON(
    path.join(target, 'package.json'),
    (json) => {
      json.name = applicationName;
      return json;
    }
  )

  info('Done');

};