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
      this.log(chalk.blue.bold('Creating new service...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating service') + ' ' +
               chalk.magenta.bold(this.arg) + chalk.blue.bold('...') + '\n');
    }

    var prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Service name :'),
        default: this.arg ? to.slug(this.arg) : undefined
      },
      {
        type: 'input',
        name: 'argDesc',
        message: chalk.yellow('Service desc :'),
        default: 'TODO: Add service description.'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
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
