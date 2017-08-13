# angular-modsmith Generator
Yeoman generator for quickly setting up a project for implementing an AngularJS 1.x module (**not application**).
 - Choice of Grunt / Gulp as the build system.
 - Sub-generators for directives and services.
 - Uses *stylus* for stylesheets
 - Uses *eslint* for static code checking.
 - Uses *Karma* + *Jasmine* for unit testing and *coverage* reporter for code coverage.

> Stability - Alpha :construction:
> The generator under active development. See the TODO list below.

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
## Available generators
### default
Default generator for setting up a new module.

### directive
Generates code for a directive.

### service
Generates code for a service.

## TODO

- [ ] Complete support for GulpJS
- [ ] Update dependencies, if necessary
- [ ] Migrate from `grunt-autoprefixer` to `grunt-postcss`
- [ ] Migrate to IIFE syntax
- [ ] Support for ui-router
- [ ] Optimize build steps

> Some of these items are fully/ partially implemented in my local repo.
Need to be rebased and tested.

## Acknowledgement
I have been using [angular-fullstack-generator](https://github.com/angular-fullstack/generator-angular-fullstack) v2.1.1 to setup my applications for a few years now. As a result, there may be similarities in the template code.

## License
BSD-3-Clause Copyright [Sanjeev Premi](spremi@ymail.com)
