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
        desc: 'Name of the module'
      });

    //
    // Get name of current directory
    //
    this.dir = path.basename(process.cwd());
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.green('angular-modsmith') + ' generator!'
    ));

    if (typeof this.options.arg !== 'undefined') {
      this.log(chalk.blue.bold('Creating module') + ' ' +
        chalk.magenta.bold(this.options.arg) + chalk.blue.bold('...') + '\n');
    }

    const prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Package name :'),
        default: this.options.arg || this.dir
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('Package description:'),
        default: 'TODO: Add package description.'
      },
      {
        type: 'input',
        name: 'argVersion',
        message: chalk.yellow('Package version:'),
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'argRepo',
        message: chalk.yellow('Package Repository:')
      },
      {
        type: 'list',
        name: 'argLicense',
        choices: [
          {
            name  : 'Apache License 2.0',
            value : 'Apache-2.0',
            short : 'Apache-2.0'
          },
          {
            name  : 'BSD 2-clause "Simplified" License',
            value : 'BSD-2-Clause',
            short : 'BSD-2-Clause'
          },
          {
            name  : 'BSD 3-clause "New" or "Revised" License',
            value : 'BSD-3-Clause',
            short : 'BSD-3-Clause'
          },
          {
            name  : 'GNU General Public License v2.0 only',
            value : 'GPL-2.0',
            short : 'GPL-2.0'
          },
          {
            name  : 'GNU General Public License v3.0 only',
            value : 'GPL-3.0',
            short : 'GPL-3.0'
          },
          {
            name  : 'GNU Lesser General Public License v2.1 only',
            value : 'LGPL-2.1',
            short : 'LGPL-2.1'
          },
          {
            name  : 'GNU Lesser General Public License v3.0 only',
            value : 'LGPL-3.0',
            short : 'LGPL-3.0'
          },
          {
            name  : 'MIT License',
            value : 'MIT',
            short : 'MIT'
          },
          {
            name  : 'Other License',
            value : 'Other',
            short : 'Other'
          }
        ],
        message: chalk.yellow('Select applicable license:')
      },
      {
        type: 'list',
        name: 'argBuild',
        choices: [
          {
            name  : 'Grunt',
            value : 'grunt',
            short : 'grunt'
          },
          {
            name  : 'Gulp',
            value : 'gulp',
            short : 'gulp'
          }
        ],
        message: chalk.yellow('Build with:')
      },
      {
        type: 'input',
        name: 'argKeywords',
        message: chalk.yellow('Package keywords [comma-separated]:'),
        filter: function (str) {
          return str.trim()
            .replace(/\s*,\s*/g, ',')   // Remove space around commas
            .replace(/,+/g, ',')        // Remove consecutive commas
            .replace(/(^,)|(,$)/g, '')  // Remove leading & trailing commas
            .split(/,/g);
        }
      },
      {
        type: 'confirm',
        name: 'argBowerJson',
        message: chalk.yellow('Create bower.json:'),
        default: true
      },
      {
        type: 'input',
        name: 'argAuthorName',
        message: chalk.yellow('Author\'s name:'),
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'argAuthorEmail',
        message: chalk.yellow('Author\'s email:'),
        default: this.user.git.email
      },
      {
        type: 'input',
        name: 'argAuthorHome',
        message: chalk.yellow('Author\'s homepage:')
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = {
        pkg : {
          name  : {
            orig    : props.argName,
            slug    : to.slug(props.argName),
            camel   : to.camel(props.argName)
          },
          desc      : props.argDesc,
          version   : props.argVersion,
          repo      : props.argRepo,
          license   : props.argLicense,
          build     : props.argBuild,
          keywords  : props.argKeywords
        },
        author  : {
          name  : props.argAuthorName,
          email : props.argAuthorEmail,
          url   : props.argAuthorHome
        },
        bowerJson : props.argBowerJson
      };
    });
  }

  /**
   * Private function to copy base configuration files
   */
  _copyBaseFiles() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_npmignore'),
      this.destinationPath('.npmignore'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_gitattributes'),
      this.destinationPath('.gitattributes'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_eslintignore'),
      this.destinationPath('.eslintignore'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_eslintrc.js'),
      this.destinationPath('.eslintrc.js'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      this.props);
  }

  /**
   * Private function to copy license file
   */
  _copyLicense() {
    var licenseTpl = '';

    switch (this.props.pkg.license) {
      case 'Apache-2.0':
        licenseTpl = 'licenses/LICENSE_APACHE_2_0';
        break;

      case 'BSD-2-Clause':
        licenseTpl = 'licenses/LICENSE_BSD_2_CLAUSE';
        break;

      case 'BSD-3-Clause':
        licenseTpl = 'licenses/LICENSE_BSD_3_CLAUSE';
        break;

      case 'GPL-2.0':
        licenseTpl = 'licenses/LICENSE_GPL_2_0';
        break;

      case 'GPL-3.0':
        licenseTpl = 'licenses/LICENSE_GPL_3_0';
        break;

      case 'LGPL-2.1':
        licenseTpl = 'licenses/LICENSE_LGPL_2_1';
        break;

      case 'LGPL-3.0':
        licenseTpl = 'licenses/LICENSE_LGPL_3_0';
        break;

      case 'MIT':
        licenseTpl = 'licenses/LICENSE_MIT';
        break;

      default:
        licenseTpl = 'licenses/LICENSE_OTHER';
        break;
    }

    this.fs.copyTpl(
      this.templatePath(licenseTpl),
      this.destinationPath('LICENSE'),
      this.props);
  }

  /**
   * Private function to copy build script
   */
  _copyBuildScript() {
    if (this.props.pkg.build === 'gulp') {
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this.props);
    }

    if (this.props.pkg.build === 'grunt') {
      this.fs.copyTpl(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        this.props);
    }
  }

  /**
   * Private function to copy build script
   */
  _copyBowerJson() {
    if (this.props.bowerJson) {
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this.props);
    }
  }

  /**
   * Private function to copy source files
   */
  _copySourceFiles() {
    var dirOk = true;

    try {
      mkdirp.sync('src');
    } catch (e) {
      dirOk = false;

      this.log('\n' + chalk.red.bold('Couldn\'t create directory:') + ' ' +
               chalk.magenta.bold('src'));
      this.log(chalk.yellow(e.message) + '\n');
    }

    if (!dirOk) {
      return this.error(new Error('Failed to create directory: src'));
    }

    //
    // Create source files
    //
    this.fs.copyTpl(
      this.templatePath('_module.js'),
      this.destinationPath('src/index.js'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      this.props);
  }

  /**
   * Private function to copy test files
   */
  _copyTestFiles() {
    var dirOk = true;

    try {
      mkdirp.sync('test');
    } catch (e) {
      dirOk = false;

      this.log('\n' + chalk.red.bold('Couldn\'t create directory:') + ' ' +
               chalk.magenta.bold('test'));
      this.log(chalk.yellow(e.message) + '\n');
    }

    if (!dirOk) {
      return this.error(new Error('Failed to create directory: test'));
    }

    this.fs.copyTpl(
      this.templatePath('test/_karma.conf.js'),
      this.destinationPath('test/karma.conf.js'),
      this.props);

    this.fs.copyTpl(
      this.templatePath('test/_main.js'),
      this.destinationPath('test/main.js'),
      this.props);
  }

  /**
   * Private function to initialize git repo and commit sources
   */
  _gitCommit() {
    const sgit = require('simple-git')(this.destinationRoot());

    var msg = 'chore: Seed the AngularJS module\n' +
              '\n' +
              'Created by generator-angular-modsmith v' +
              this.rootGeneratorVersion() + '.\n';

    sgit.init().add('.').commit(msg);

    this.log(chalk.white.bold('\nInitialized repo.\n'));
  }

  writing() {
    this._copyBaseFiles();
    this._copyLicense();
    this._copyBuildScript();
    this._copyBowerJson();
    this._copySourceFiles();
    this._copyTestFiles();
  }

  install() {
    this.config.set('pkg', this.props.pkg);
    this.config.set('author', this.props.author);

    this.log(chalk.white.bold('\nInstalling dependencies...\n'));

    this.npmInstall();
  }

  end() {
    this._gitCommit();

    this.log(chalk.green.bold('\nReady.\n'));
  }
};
