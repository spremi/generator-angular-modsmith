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
    }.bind(this));
  },

  writing: {
    //
    // Create directories
    //
    dirs: function () {
      var ok = true;
      var dstDir = path.join('src', 'services', this.props.svc.name.camel);

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

      var dstDir = path.join('src', 'services', this.props.svc.name.camel);

      this.template('_service.js',
                    path.join(dstDir, this.props.svc.name.camel + '.service.js'),
                    this.props);

      this.template('_service.spec.js',
                    path.join(dstDir, this.props.svc.name.camel + '.service.spec.js'),
                    this.props);
    }
  },

  install: function () {
    this.installDependencies();
  }
});
