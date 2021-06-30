/**
 * List of available templates
 */
const templates = {
  'core-angular-cli': '../projects/angular-cli',
  'core-cdn': '../projects/core-cdn',
  'core-lit-element-starter-ts': '../projects/lit-element-starter-ts',
  'core-webpack-typescript': '../projects/webpack-core-typescript',
  'core-vue': '../projects/vue-app',
  'core-create-react-app': '../projects/create-react-app',
  'core-electron-typescript': '../projects/electron-typescript-core',
  'core-library-kit': '../projects/clarity-addon-kit',
}

const defaultTemplate = 'core-angular-cli'

module.exports = {
  templates,
  defaultTemplate
}