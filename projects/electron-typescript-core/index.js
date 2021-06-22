/**
 * Electron TypeScript App
 */
const path = require('path');
const {execute, info, commandOutput, syncFiles, npmInstallPackages, updatePackageJSON, documentation} = require('../../src/utils');

module.exports = function CreateReactApp(target, applicationName, version, sourceDirectory) {

  info(`Create new Electron TypeScript project named ${applicationName}`);

  commandOutput(execute(`npx create-electron-app ${applicationName} --template=typescript-webpack`, {cwd: sourceDirectory}));

  info(`Install Clarity Core and some additional packages`);

  npmInstallPackages([
    '@cds/core',
    '@cds/city',
    'url-loader',
    'file-loader'
  ], target);

  info(`Modify the new app`);

  syncFiles(path.join(__dirname, 'files'), target);

  updatePackageJSON(
    path.join(target, 'package.json'),
    (json) => {
      json.name = applicationName;
      return json;
    }
  );

  documentation('');
  documentation(`To start the project:`);
  documentation(`\t cd ${applicationName}`);
  documentation(`\t npm run start`);
  documentation('')

  info('Done');
};