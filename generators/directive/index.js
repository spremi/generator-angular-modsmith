'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const to = require('to-case');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    //
    // Get command-line argument, if any
    //
    this.argument('arg', {type: String, required: false, desc: 'Name of the directive'});
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('angular-modsmith') + ' generator!'
    ));

    if (typeof this.options.arg === 'undefined') {
      this.log(chalk.blue.bold('Creating new directive...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating directive') + ' ' +
               chalk.magenta.bold(this.options.arg) + chalk.blue.bold('...') + '\n');
    }

    const prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Directive name :'),
        default: this.options.arg ? to.slug(this.options.arg) : undefined
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('Directive desc :'),
        default: 'TODO: Add directive description.'
      },
      {
        type: 'confirm',
        name: 'argExtTpl',
        message: chalk.yellow('Create an external template?'),
        default: true
      },
      {
        type: 'confirm',
        name: 'argStyle',
        message: chalk.yellow('Create stylesheets?'),
        default: true
      },
      {
        type: 'confirm',
        name: 'argRestrict',
        message: chalk.yellow('Create link() function?'),
        default: true
      },
      {
        type: 'list',
        name: 'argRestrict',
        message: chalk.yellow('Restrict to?'),
        choices: [
          {
            name  : 'Attribute name only',
            value : 'A',
            short : 'A'
          },
          {
            name  : 'Element only',
            value : 'E',
            short : 'E'
          },
          {
            name  : 'Class only',
            value : 'C',
            short : 'C'
          },
          {
            name  : 'Comment only',
            value : 'M',
            short : 'M'
          }
        ],
        default: 'E'
      }
    ];

    return this.prompt(prompts).then(props => {
      //
      // Read package configuration.
      //
      var pkgconf = this.config.getAll();

      //
      // Add package configuration to directive options
      //
      this.props = {
        pkg     : JSON.parse(JSON.stringify(pkgconf.pkg)),
        author  : JSON.parse(JSON.stringify(pkgconf.author)),
        dtv : {
          name  : {
            orig    : props.argName,
            slug    : to.slug(props.argName),
            camel   : to.camel(props.argName)
          },
          desc      : props.argDesc,
          style     : props.argStyle,
          extTpl    : props.argExtTpl,
          linkFn    : props.argLinkFn,
          restrict  : props.argRestrict
        }
      };
    });
  }

  writing() {
    //
    // Create directories
    //
    var ok = true;
    var dstDir = path.join('src', 'directives', this.props.dtv.name.camel);

    try {
      mkdirp.sync(dstDir);
    } catch (e) {
      ok = false;

      this.log('\n' + chalk.red.bold('Couldn\'t create directory:') + ' ' +
                chalk.magenta.bold(dstDir));
      this.log(chalk.yellow(e.message) + '\n');
    } finally {
      if (ok) {
        this.dstError = false;
      } else {
        this.dstError = true;
      }
    }

    if (this.dstError) {
      return;
    }

    //
    // Copy sources files
    //
    this.fs.copyTpl(
      this.templatePath('_directive.js'),
      this.destinationPath(path.join(dstDir, this.props.dtv.name.camel + '.directive.js')),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_directive.spec.js'),
      this.destinationPath(path.join(dstDir, this.props.dtv.name.camel + '.directive.spec.js')),
      this.props);

    if (this.props.dtv.style) {
      this.fs.copyTpl(
        this.templatePath('_directive.styl'),
        this.destinationPath(path.join(dstDir, this.props.dtv.name.camel + '.directive.styl')),
        this.props);
    }

    if (this.props.dtv.extTpl) {
      this.fs.copyTpl(
        this.templatePath('_directive.html'),
        this.destinationPath(path.join(dstDir, this.props.dtv.name.camel + '.directive.html')),
        this.props);
    }

    //
    // Copy module-level 'stylus' file - only if it doesn't exist.
    //
    var modStylus = this.destinationPath('src/module.styl');

    if (fs.existsSync(modStylus)) {
      this.log('\n' + chalk.yellow('File') + ' module.styl ' + chalk.yellow('already exists.') + '\n');
    } else {
      this.fs.copyTpl(
        this.templatePath('_module.styl'),
        this.destinationPath(path.join(dstDir, '..', 'module.styl')),
        this.props);
    }
  }
};
