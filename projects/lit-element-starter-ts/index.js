/**
 * LitElement starter TS
 */
const path = require('path');
const {info, syncFiles, commandOutput, execute, updatePackageJSON} = require('../../src/utils');

module.exports = function LitElementStarterTS(target, applicationName, version, sourceDirectory) {

  info(`Create new LitElement Starter TypeScript project named ${applicationName}`);

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