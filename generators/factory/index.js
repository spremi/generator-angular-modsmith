'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var to = require('to-case');

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

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
