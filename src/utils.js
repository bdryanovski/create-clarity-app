const fs = require('fs-extra')
const chalk = require('chalk')
const os = require('os')
const execSync = require('child_process').execSync

const ora = require('ora')

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
    error(
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
    error(
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
  const spn = ora({text: `${cmd} \n`, color: 'green'}).start();

  try {
    const output = execSync(cmd, {cwd: options.cwd}).toString().trim();
    spn.succeed(`${cmd} - done`)
    return output;
  } catch (error) {
    spn.fail(error.message)
    if (options.ignoreError) {
      return
    }
    error(error.stderr.toString())
    throw error.message
    // throw error
  }
}

function npmInstallPackages(packages, initDirectory) {
  execute(`npm install ${packages.join(' ')} --save`, {cwd: initDirectory})
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

function syncFiles(target, destination, options = {}) {
  const spn = ora({text: 'Syncing template files ...\n', color: 'green'}).start();

  try {
    fs.copySync(target, destination, {...{overwrite: true}, ...options});
    spn.succeed('All files are synchronize.');
  } catch (e) {
    spn.fail(e.message);
  }
}

// UI

function info(string) {
  console.log(`🦄 ${chalk.green(string)}`)
}

function error(string) {
  console.log(`\n🐞 ${chalk.red(string)}\n`)
}

function documentation(string) {
  console.log(`${chalk.cyan(string)}`)
}

function commandOutput(string) {
  console.log(`\n${chalk.gray(string)}\n`)
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