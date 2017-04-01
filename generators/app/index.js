'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var to = require('to-case');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing: function () {
    //
    // Get command-line argument, if any
    //
    this.argument('arg', {type: String, required: false});

    //
    // Get name of current directory
    //
    this.dir = path.basename(process.cwd());
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.green('angular-modsmith') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Package name :'),
        default: this.arg || this.dir
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
          return str
                  .trim()
                  .replace(/\s*,\s*/g, ',')   // Remove space around commas
                  .replace(/,+/g, ',')        // Remove consecutive commas
                  .replace(/(^,)|(,$)/g, '')  // Remove leading & trailing commas
                  .split(/,/g);
        }
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

    return this.prompt(prompts).then(function (props) {
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
        }
      };
    }.bind(this));
  },

  writing: {
    //
    // Copy base configuration files
    //
    base: function () {
      this.template('_package.json',  'package.json',   this.props);
      this.template('_npmignore',     '.npmignore',     this.props);
      this.template('_gitignore',     '.gitignore',     this.props);
      this.template('_gitattributes', '.gitattributes', this.props);
      this.template('README.md',      'README.md',      this.props);
      this.template('_editorconfig',  '.editorconfig',  this.props);
      this.template('_eslintignore',  '.eslintignore',  this.props);
      this.template('_eslintrc.js',   '.eslintrc.js',   this.props);

      if (this.props.pkg.build === 'gulp') {
        this.template('_gulpfile.js', 'gulpfile.js', this.props);
      }

      if (this.props.pkg.build === 'grunt') {
        this.template('_Gruntfile.js', 'Gruntfile.js', this.props);
      }
    },

    //
    // Copy LICENSE
    //
    license: function () {
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

      this.template(licenseTpl, 'LICENSE', this.props);
    },

    //
    // Create source directories
    //
    srcdir: function () {
      var ok = true;

      try {
        mkdirp.sync('src');
      } catch (e) {
        ok = false;

        this.log('\n' + chalk.red.bold('Couldn\'t create directory:') + ' ' +
                 chalk.magenta.bold('src'));
        this.log(chalk.yellow(e.message) + '\n');
      } finally {
        if (ok) {
          this.dstError = false;
        } else {
          this.dstError = true;
        }
      }
    },

    //
    // Create source files
    //
    sources: function () {
      if (this.dstError) {
        return;
      }
      this.template('_module.js', 'src/index.js', this.props);
    },

    //
    // Create test directories
    //
    tstdir: function () {
      var ok = true;

      try {
        mkdirp.sync('test');
      } catch (e) {
        ok = false;

        this.log('\n' + chalk.red.bold('Couldn\'t create directory:') + ' ' +
                 chalk.magenta.bold('test'));
        this.log(chalk.yellow(e.message) + '\n');
      } finally {
        if (ok) {
          this.dstError = false;
        } else {
          this.dstError = true;
        }
      }
    },

    //
    // Create test sources
    //
    tests: function () {
      if (this.dstError) {
        return;
      }
      this.template('test/_karma.conf.js', 'test/karma.conf.js', this.props);
      this.template('test/_main.js', 'test/main.js', this.props);
    }

  },

  install: function () {
    this.config.set('pkg', this.props.pkg);
    this.config.set('author', this.props.author);

    this.installDependencies();
  }
});
