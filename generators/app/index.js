'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var to = require('to-case');

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
        choices : [
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
        type: 'input',
        name: 'argKeywords',
        message: chalk.yellow('Package keywords [comma-separated]:')
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
