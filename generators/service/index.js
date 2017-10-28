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
        desc: 'Name of the service'
      });
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
      this.templatePath('_service.js'),
      this.destinationPath(path.join(dst, this.props.svc.name.camel + '.service.js')),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_service.spec.js'),
      this.destinationPath(path.join(dst, this.props.svc.name.camel + '.service.spec.js')),
      this.props);
  }

  /**
   * Private function to add sources to git repo and commit
   */
  _gitCommit(dst) {
    const sgit = require('simple-git')(this.destinationRoot());

    var msg = 'chore: Add service \'' + this.props.svc.name.slug + '\'\n' +
              '\n' +
              'Created by generator-angular-modsmith v' +
              this.rootGeneratorVersion() + '.\n';

    sgit.add(dst).commit(msg);

    this.log(chalk.white.bold('\nCommitted to repo.\n'));
  }

  writing() {
    var dstDir = path.join('src', 'services', this.props.svc.name.camel);

    this._createDir(dstDir);
    this._copySourceFiles(dstDir);
  }

  end() {
    var dstDir = path.join('src', 'services', this.props.svc.name.camel);

    this._gitCommit(dstDir);
  }
};
