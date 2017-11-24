# generator-angular-modsmith
Yeoman generator to quickly setup a project for implementing an AngularJS 1.x module (**not application**).

| Attribute | Status|
| :--- | :--- |
| **Stability** | Release Candidate |
| **Features**  | Release Candidate |

## Features
- Compatible with **`yeoman-generator v2`**.
- Choice of build systems:
  - Grunt
  - Gulp _(Under development)_
- Sub-generators to generate code for:
  - Component
  - Directive
  - Factory
  - Service
- The generated code:
  - Contains file headers.
  - Contains comments compatible with *ngdoc*.
  - Follows *IIFE* syntax.
  - Is automatically committed to `git` repository.
    - Keeps your changes independent of generated code.
- Optionally generate `bower.json`.
- Supports **Stylus** for stylesheets.
- Uses **ESLint** for static code checking.
  - Uses *eslint-plugin-angular* for checking code against best practices.
- Uses *Karma* + *Jasmine* for unit testing.
  - Uses *coverage* reporter for code coverage.
- Synonyms for build targets
  - Adapt to your own, instead of learning new ones.

### Under development
These features are under active development:
- [ ] Complete support for GulpJS
- [x] ~~Update dependencies, if necessary~~
- [x] ~~Migrate from `grunt-autoprefixer` to `grunt-postcss`~~
- [x] ~~Migrate to yeoman-generator 1.0~~ Migrated to **2.0**
- [x] ~~Migrate to IIFE syntax~~
- [ ] Optimize build steps
- [x] ~~Commit generated files into `git` as individual commit.~~

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

> As a common convention, values in square brackets below are optional.

#### default
Default generator for setting up a new module.
```sh
yo angular-modsmith [name-of-module]
```
#### component
Generates code for a component in the module.
```sh
yo angular-modsmith:component [name-of-component]
```
#### directive
Generates code for a directive in the module.
```sh
yo angular-modsmith:directive [name-of-directive]
```
#### service
Generates code for a service in the module.
```sh
yo angular-modsmith:service [name-of-service]
```
#### factory
Generates code for a factory in the module.
```sh
yo angular-modsmith:factory [name-of-factory]
```

### Build tasks in generated modules
These tasks are available on both **Grunt** and **Gulp** (_under development_).
#### eslint | lint
Perform static type checking of the module sources. It is the _**default**_ task.

#### karma | test
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
