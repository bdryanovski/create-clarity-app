/**
 * Vue Core template
 */
const {exec} = require('child_process');
const path = require('path');
const {info, syncFiles, commandOutput, execute, updatePackageJSON} = require('../../src/utils');

module.exports = function VueCore(target, applicationName, version, sourceDirectory) {

  info(`Create new Vue Core starter project ${applicationName}`);

  /**
   * @note Could not make `vue` work correctly I'm getting an error when try to run it inside the context
   * of Node, but running locally everything is fine. Don't want to spend much time on that right now so
   * will get back to it later. Use already builded application as template.
   *
   * Hint: I could use `--inlinePreset` to pass a better described project setup - this may fix my problem ?
   *
   */

  // commandOutput(execute(`npx vue create ${applicationName} --preset __default_vue_3__ --no-git`, {
  //   cwd: sourceDirectory
  // }))

  // npmInstallPackages(['@cds/core', '@cds/city'], target);

  syncFiles(path.join(__dirname, 'files'), target);

  updatePackageJSON(
    path.join(target, 'package.json'),
    (json) => {
      json.name = applicationName;
      return json;
    }
  )

  commandOutput(execute(`npm install`, { cwd: target }))

  info('Done');

};