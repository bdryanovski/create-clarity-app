/**
 * Core CDN template
 */
const path = require('path');
const { info, syncFiles, updatePackageJSON, commandOutput, execute} = require('../../src/utils');

module.exports = function AngularCLI(target, applicationName, version, sourceDirectory) {

  info(`Create new Core CDN project named ${applicationName}`);

  syncFiles(path.join(__dirname, 'files'), target);

  updatePackageJSON(
    path.join(target, 'package.json'),
    (json) => {
      json.name = applicationName;
      return json;
    }
  )

  commandOutput(execute(`npm install`, {cwd: target}))

  info('Done');
};