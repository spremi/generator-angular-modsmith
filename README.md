# generator-angular-modsmith
Yeoman generator to quickly setup a project for implementing an AngularJS 1.x module (**not application**).

:construction:

| Attribute | Status|
| :--- | :--- |
| **Stability** | Beta |
| **Features**   | Alpha |

## Features
- Choice of build systems:
  - Grunt
  - Gulp _(Under development)_
- Sub-generators to generate code for:
  - Directive
  - Factory
  - Service
- The generated code:
  - Contains file headers.
  - Contains comments compatible with *ngdoc*.
  - Follows *IIFE* syntax.
- Supports **Stylus** for stylesheets.
- Uses **ESLint** for static code checking.
  - Uses *eslint-plugin-angular* for checking code against best practices.
- Uses *Karma* + *Jasmine* for unit testing.
  - Uses *coverage* reporter for code coverage.

### Under development
These features are under active development:
- [ ] Complete support for GulpJS
- [x] Update dependencies, if necessary
- [x] Migrate from `grunt-autoprefixer` to `grunt-postcss`
- [ ] Migrate to yeoman-generator 1.0
- [x] Migrate to IIFE syntax
- [ ] Optimize build steps
- [ ] Commit files into `git` as specific commit.

The code associated with these features can be viewed in corresponding
branches. The latest code, however, may still be in my local repo.

## Installation
Install **Yeoman**, if it isn't already installed:
```sh
npm install -g yo
```
Install **this** generator:
```sh
npm install -g generator-angular-modsmith
```

## Usage
Run this command in the directory of your choice:
```sh
yo angular-modsmith
```
### Available generators
#### default
Default generator for setting up a new module.
```sh
yo angular-modsmith
```
#### directive
Generates code for a directive in the module.
```sh
yo angular-modsmith:directive
```
#### service
Generates code for a service in the module.
```sh
yo angular-modsmith:service
```
#### factory
Generates code for a factory in the module.
```sh
yo angular-modsmith:factory
```

> Name of the module/ directive/ service/ factory can, optionally, be provided as a parameter to these commands.

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

## Acknowledgement
I have been using [angular-fullstack-generator](https://github.com/angular-fullstack/generator-angular-fullstack) v2.1.1 to setup my applications for a few years now. As a result, there may be similarities in the template code.

## License
BSD-3-Clause Copyright [Sanjeev Premi](spremi@ymail.com)
