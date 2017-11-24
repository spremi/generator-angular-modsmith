'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
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
        desc: 'Name of the component'
      });
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('angular-modsmith') + ' generator!'
    ));

    if (typeof this.options.arg === 'undefined') {
      this.log(chalk.blue.bold('Creating new component...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating component') + ' ' +
               chalk.magenta.bold(this.options.arg) + chalk.blue.bold('...') + '\n');
    }

    const prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('component name :'),
        default: this.options.arg ? to.slug(this.options.arg) : undefined
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('component desc :'),
        default: 'TODO: Add component description.'
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
        name: 'argTransclude',
        message: chalk.yellow('Transclude?'),
        default: false
      },
      {
        type: 'confirm',
        name: 'argInitFn',
        message: chalk.yellow('Create Controller.$onInit()?'),
        default: false
      },
      {
        type: 'confirm',
        name: 'argDestroyFn',
        message: chalk.yellow('Create Controller.$onDestroy()?'),
        default: false
      },
      {
        type: 'confirm',
        name: 'argChangesFn',
        message: chalk.yellow('Create Controller.$onChanges()?'),
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      //
      // Read package configuration.
      //
      var pkgconf = this.config.getAll();

      //
      // Add package configuration to component options
      //
      this.props = {
        pkg     : JSON.parse(JSON.stringify(pkgconf.pkg)),
        author  : JSON.parse(JSON.stringify(pkgconf.author)),
        cmp : {
          name  : {
            orig    : props.argName,
            slug    : to.slug(props.argName),
            camel   : to.camel(props.argName)
          },
          desc      : props.argDesc,
          style     : props.argStyle,
          extTpl    : props.argExtTpl,
          transclude: props.argTransclude,
          initFn    : props.argInitFn,
          destroyFn : props.argDestroyFn,
          changesFn : props.argChangesFn
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


  writing() {
    var dstDir = path.join('src', 'components', this.props.cmp.name.camel);

    this._createDir(dstDir);
  }

  install() {
    this.installDependencies();
  }
};
