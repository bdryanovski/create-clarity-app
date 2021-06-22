# create-clarity-app (BETA)
[![npm](https://img.shields.io/npm/v/create-clarity-app.svg)](https://www.npmjs.com/package/create-clarity-app)
[![npm](https://img.shields.io/npm/l/create-clarity-app.svg)](https://github.com/bdryanovski/create-clarity-app/blob/master/LICENSE)

Generate ready to use application that include [Clarity](https://clarity.design) packages like pure Core components, Angular & React wrappers or start building Clarity Web components for your next project.

### Quick starter

```bash
npx create-clarity-app my-application
```
(npx comes with npm 5.2+ and higher, see instructions for older npm versions)

```bash
npm install -g create-clarity-app

create-clarity-app my-application
```

Create application with the default template
```bash
$ create-clarity-app my-application
```

<p align="center"><img src="./docs/init.gif?raw=true"/></p>

Some of the templates may require additional steps so to not miss anything check the output of the command for them.

For more information on how to use `create-clarity-app` run:

```bash
$ create-clarity-app --help

Usage: create-clarity-app project-name [options]

Options:
  -v, --version              output the current version
  -t, --template <template>  base for the project (choices: "angular-cli", "cdn", "create-react-app",
                             "electron-typescript", "library-kit", "lit-element-starter-ts", "vue", "webpack-typescript",
                             default: "angular-cli")
  -h, --help                 display help for command

Create Clarity Application 1.0.0

Example: create-clarity-app my-application --template library-kit

You may select one of the templates below by passing -t or --template argument:
	 - angular-cli [default]
	 - cdn
	 - create-react-app
	 - electron-typescript
	 - library-kit
	 - lit-element-starter-ts
	 - vue
	 - webpack-typescript
```


### Disclaimer

This tool is experimental so some changes could be done without any warning.

This is not official tool.