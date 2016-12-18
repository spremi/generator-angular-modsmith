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
      this.log(chalk.blue.bold('Creating new directive...') + '\n');
    } else {
      this.log(chalk.blue.bold('Creating directive') + ' ' +
               chalk.magenta.bold(this.arg) + chalk.blue.bold('...') + '\n');
    }

    var prompts = [
      {
        type: 'input',
        name: 'argName',
        message: chalk.yellow('Directive name :'),
        default: this.arg ? to.slug(this.arg) : undefined
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
        name: 'argRestrict',
        message: chalk.yellow('Create link() function?'),
        default: true
      },
      {
        type: 'list',
        name: 'argRestrict',
        message: chalk.yellow('Restrict to?'),
        choices : [
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
      }
    ];

    return this.prompt(prompts).then(function (props) {
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
          restrict  : props.argRestrict
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
      var dstDir = path.join('src', 'directives', this.props.dtv.name.camel);

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
    }
  },

  install: function () {
    this.installDependencies();
  }
});
