const fs = require('fs-extra')
const chalk = require('chalk')
const os = require('os')
const execSync = require('child_process').execSync

function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'docs',
    'LICENSE',
    'README.md',
    'mkdocs.yml',
    'Thumbs.db',
  ];
  // These files should be allowed to remain on a failed install, but then
  // silently removed during the next create.
  const errorLogFilePatterns = [
    'npm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
  ];
  const isErrorLog = file => {
    return errorLogFilePatterns.some(pattern => file.startsWith(pattern));
  };

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // IntelliJ IDEA creates module files before CRA is launched
    .filter(file => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter(file => !isErrorLog(file));

  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    );
    for (const file of conflicts) {
      try {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(`${file}/`)}`);
        } else {
          console.log(`  ${file}`);
        }
      } catch (e) {
        console.log(`  ${file}`);
      }
    }
    console.log();
    console.log(
      'Either try using a new directory name, or remove the files listed above.'
    );

    return false;
  }

  // Remove any log files from a previous installation.
  fs.readdirSync(root).forEach(file => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file));
    }
  });
  return true;
}

function execute(cmd, options = {ignoreError: false}) {
  commandInfo(cmd)
  try {
    return execSync(cmd, {cwd: options.cwd}).toString().trim();
  } catch (error) {
    if (options.ignoreError) {
      return
    }
    console.log(error.stderr.toString())
    throw error.message
    // throw error
  }
}

function npmInstallPackages(packages, initDirectory) {
  const toInstall = packages.join(' ')
  commandInfo(`Adding packages ${toInstall}`)
  execute(`npm install ${toInstall} --save`, {cwd: initDirectory})
}

function updatePackageJSON(location, method) {
  const content = fs.readFileSync(location, {encoding: 'utf8'})
  fs.writeFileSync(
    location,
    JSON.stringify(
      method(JSON.parse(content)),
      null,
      2
    ) + os.EOL
  )
}

function writeFile(location, file, content) {
  return fs.writeFileSync(
    path.join(location, file),
    content
  );
}

// UI

function info(string) {
  console.log(chalk.green(string))
}

function error(string) {
  console.log(chalk.red(string))
}

function documentation(string) {
  console.log(string)
}

function commandInfo(string) {
  console.log(">>", chalk.yellow(string));
}

function commandOutput(string) {
  console.log(chalk.gray(string))
}

function syncFiles(target, destination, options = {}) {
  commandOutput('Syncing files ...')
  return fs.copySync(target, destination, {...{ overwrite: true}, ...options})
}

module.exports = {
  isSafeToCreateProjectIn,
  execute,
  writeFile,
  npmInstallPackages,
  updatePackageJSON,
  info,
  error,
  documentation,
  commandOutput,
  syncFiles
}