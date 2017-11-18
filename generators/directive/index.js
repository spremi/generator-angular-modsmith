'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const to = require('to-case');
const mkdirp = require('mkdirp');
const fs = require('fs');

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
        desc: 'Name of the directive'
      });
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
        name: 'argLinkFn',
        message: chalk.yellow('Create link() function?'),
        default: true
      },
      {
        type: 'confirm',
        name: 'argLinkDestroy',
        message: chalk.yellow('Add cleanup on $destroy?'),
        when: function (response) {
          return response.argLinkFn;
        }
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
      },
      {
        type: 'confirm',
        name: 'argTransclude',
        message: chalk.yellow('Transclude?'),
        default: false
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
          destroyFn : props.argLinkDestroy,
          restrict  : props.argRestrict,
          transclude: props.argTransclude
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
      this.templatePath('_directive.js'),
      this.destinationPath(path.join(dst, this.props.dtv.name.camel + '.directive.js')),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_directive.spec.js'),
      this.destinationPath(path.join(dst, this.props.dtv.name.camel + '.directive.spec.js')),
      this.props);

    if (this.props.dtv.extTpl) {
      this.fs.copyTpl(
        this.templatePath('_directive.html'),
        this.destinationPath(path.join(dst, this.props.dtv.name.camel + '.html')),
        this.props);
    }

    if (this.props.dtv.style) {
      this.fs.copyTpl(
        this.templatePath('_directive.styl'),
        this.destinationPath(path.join(dst, this.props.dtv.name.camel + '.styl')),
        this.props);

      //
      // Copy module-level 'stylus' file - only if it doesn't exist.
      //
      var modStylus = this.destinationPath('src/module.styl');

      if (fs.existsSync(modStylus)) {
        this.log('\n' + chalk.yellow('File') + ' module.styl ' + chalk.yellow('already exists.') + '\n');
      } else {
        this.fs.copyTpl(
          this.templatePath('_module.styl'),
          this.destinationPath(path.join(dst, '..', 'module.styl')),
          this.props);
      }
    }
  }

  /**
   * Private function to add sources to git repo and commit
   */
  _gitCommit(dst) {
    const sgit = require('simple-git')(this.destinationRoot());

    var msg = 'chore: Add directive \'' + this.props.dtv.name.slug + '\'\n' +
              '\n' +
              'Created by generator-angular-modsmith v' +
              this.rootGeneratorVersion() + '.\n';

    sgit.add(dst).commit(msg);

    this.log(chalk.white.bold('\nCommitted to repo.\n'));
  }

  writing() {
    var dstDir = path.join('src', 'directives', this.props.dtv.name.camel);

    this._createDir(dstDir);
    this._copySourceFiles(dstDir);
  }

  end() {
    var dstDir = path.join('src', 'directives', this.props.dtv.name.camel);

    this._gitCommit(dstDir);
  }
};
