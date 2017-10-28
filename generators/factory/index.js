'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const to = require('to-case');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    //
    // Get command-line argument, if any
    //
    this.argument('arg',
      {
        type: String,
        required: false,
        desc: 'Name of the factory'
      });
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('angular-modsmith') + ' generator!'
    ));

    if (typeof this.options.arg === 'undefined') {
      this.log(chalk.blue.bold('Creating new factory...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating factory') + ' ' +
               chalk.magenta.bold(this.options.arg) + chalk.blue.bold('...') + '\n');
    }

    const prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Factory name :'),
        default: this.options.arg ? to.slug(this.options.arg) : undefined
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('Factory desc :'),
        default: 'TODO: Add factory description.'
      }
    ];

    return this.prompt(prompts).then(props => {
      //
      // Read package configuration.
      //
      var pkgconf = this.config.getAll();

      //
      // Add package configuration to factory options
      //
      this.props = {
        pkg     : JSON.parse(JSON.stringify(pkgconf.pkg)),
        author  : JSON.parse(JSON.stringify(pkgconf.author)),
        fct : {
          name  : {
            orig    : props.argName,
            slug    : to.slug(props.argName),
            camel   : to.camel(props.argName)
          },
          desc      : props.argDesc
        }
      };
    });
  }

  /**
   * Private function to create directory
   */
  _createDir(dst) {
    var dirOk = true;

    try {
      mkdirp.sync(dst);
    } catch (e) {
      dirOk = false;

      this.log('\n' + chalk.red.bold('Couldn\'t create directory:') + ' ' +
               chalk.magenta.bold(dst));
      this.log(chalk.yellow(e.message) + '\n');
    }

    if (!dirOk) {
      return this.error(new Error('Failed to create directory: ' + dst));
    }
  }

  /**
   * Private function to copy source files
   */
  _copySourceFiles(dst) {
    this.fs.copyTpl(
      this.templatePath('_factory.js'),
      this.destinationPath(path.join(dst, this.props.fct.name.camel + '.factory.js')),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_factory.spec.js'),
      this.destinationPath(path.join(dst, this.props.fct.name.camel + '.factory.spec.js')),
      this.props);
  }

  writing() {
    var dstDir = path.join('src', 'factories', this.props.fct.name.camel);

    this._createDir(dstDir);
    this._copySourceFiles(dstDir);
  }
};
