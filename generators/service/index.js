'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const to = require('to-case');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    //
    // Get command-line argument, if any
    //
    this.argument('arg', {type: String, required: false, desc: 'Name of the service'});
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('angular-modsmith') + ' generator!'
    ));

    if (typeof this.options.arg === 'undefined') {
      this.log(chalk.blue.bold('Creating new service...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating service') + ' ' +
              chalk.magenta.bold(this.options.arg) + chalk.blue.bold('...') + '\n');
    }

    const prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Service name :'),
        default: this.options.arg ? to.slug(this.options.arg) : undefined
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('Service desc :'),
        default: 'TODO: Add service description.'
      }
    ];

    return this.prompt(prompts).then(props => {
      //
      // Read package configuration.
      //
      var pkgconf = this.config.getAll();

      //
      // Add package configuration to service options
      //
      this.props = {
        pkg     : JSON.parse(JSON.stringify(pkgconf.pkg)),
        author  : JSON.parse(JSON.stringify(pkgconf.author)),
        svc : {
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

  writing() {
    //
    // Create directories
    //
    var ok = true;
    var dstDir = path.join('src', 'services', this.props.svc.name.camel);

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
      this.templatePath('_service.js'),
      this.destinationPath(path.join(dstDir, this.props.svc.name.camel + '.service.js')),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_service.spec.js'),
      this.destinationPath(path.join(dstDir, this.props.svc.name.camel + '.service.spec.js')),
      this.props);
  }
};
