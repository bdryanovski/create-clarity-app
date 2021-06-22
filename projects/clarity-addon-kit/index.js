/**
 * Core Addon kit template
 */
const path = require('path');
const {info, syncFiles, updatePackageJSON, commandOutput, execute, npmInstallPackages} = require('../../src/utils');

module.exports = function CoreAddonKit(target, applicationName, version, sourceDirectory) {

  info(`Create new Core Addon Kit project named ${applicationName}`);

  syncFiles(path.join(__dirname, 'files'), target);

  updatePackageJSON(
    path.join(target, 'package.json'),
    (json) => {
      json.name = applicationName;
      return json;
    }
  );

  /**
   * @TODO there some errors with latest version of @cds/core
   *
   * @Hint maybe must update typescript and LitElement
   */

  npmInstallPackages([
    '@cds/core@5.1.1',
    '@cds/city',
  ], target)

  commandOutput(execute(`npm install`, {cwd: target}));

  info('Done');
};