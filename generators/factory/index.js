'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var to = require('to-case');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing: function () {
    //
    // Get command-line argument, if any
    //
    this.argument('arg', {type: String, required: false});
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('angular-modsmith') + ' generator!'
    ));

    if (typeof this.arg === 'undefined') {
      this.log(chalk.blue.bold('Creating new factory...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating factory') + ' ' +
               chalk.magenta.bold(this.arg) + chalk.blue.bold('...') + '\n');
    }

    var prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Factory name :'),
        default: this.arg ? to.slug(this.arg) : undefined
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('Factory desc :'),
        default: 'TODO: Add factory description.'
      }
    ];

    return this.prompt(prompts).then(function (props) {
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
    }.bind(this));
  },

  writing: {
    //
    // Create directories
    //
    dirs: function () {
      var ok = true;
      var dstDir = path.join('src', 'factories', this.props.fct.name.camel);

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
    },

    //
    // Copy sources files
    //
    sources: function () {
      if (this.dstError) {
        return;
      }

      var dstDir = path.join('src', 'factories', this.props.fct.name.camel);

      this.template('_factory.js',
                    path.join(dstDir, this.props.fct.name.camel + '.factory.js'),
                    this.props);

      this.template('_factory.spec.js',
                    path.join(dstDir, this.props.fct.name.camel + '.factory.spec.js'),
                    this.props);
    }
  },

  install: function () {
    this.installDependencies();
  }
});
