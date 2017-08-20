# generator-angular-modsmith
Yeoman generator for quickly setting up a project for implementing an AngularJS 1.x module (**not application**).

> Stability - Alpha :construction:

## Features
 - Choice of Grunt / Gulp as the build system.
 - Sub-generators for directives and services.
 - Uses *stylus* for stylesheets.
 - Uses *eslint* with *eslint-plugin-angular* for static code checking.
 - Uses *Karma* + *Jasmine* for unit testing and *coverage* reporter for code coverage.

> The generator is under active development. See the TODO list below.

## Installation
Install `yo`, if it isn't already installed:
```sh
npm install -g yo
```
Install `generator-angular-modsmith`:
```sh
npm install -g yo gulp-cli generator-angular-modsmith
```

## Usage
Run `yo angular-modsmith` in the directory of your choice:
```sh
yo angular-modsmith
```
### Available generators
#### default
Default generator for setting up a new module.

#### directive
Generates code for a directive.

#### service
Generates code for a service.

#### factory
Generates code for a factory.

### Build tasks in generated modules
These tasks are available on both **Grunt** and **Gulp** (_under development_).
#### eslint/ lint
Perform static type checking of the module sources. It is the _**default**_ task.

#### karma/ test
Executes unit tests for the modules and shows code coverage data.

#### build
Performs series of tasks required to build the distribution package.
Built package is available in the directory `dist`.

#### clean
Deletes contents of temporary and distribution directories.

#### all
Executes these tasks in sequence: `clean`, `eslint`, `test`, `build`.

## TODO

- [ ] Complete support for GulpJS
- [x] Update dependencies, if necessary
- [x] Migrate from `grunt-autoprefixer` to `grunt-postcss`
- [ ] Migrate to yeoman-generator 1.0
- [x] Migrate to IIFE syntax
- [ ] Optimize build steps

> Some of these items are fully/ partially implemented in my local repo.
Need to be rebased and tested.

## Acknowledgement
I have been using [angular-fullstack-generator](https://github.com/angular-fullstack/generator-angular-fullstack) v2.1.1 to setup my applications for a few years now. As a result, there may be similarities in the template code.

## License
BSD-3-Clause Copyright [Sanjeev Premi](spremi@ymail.com)
