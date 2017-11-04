'use strict';

const SimpleGitMock = function () {
  const _GitMock = function (arg) {
    this._path = arg;
  };

  _GitMock.prototype.cwd = function () {
    return this;
  };

  _GitMock.prototype.init = function () {
    return this;
  };

  _GitMock.prototype.add = function () {
    return this;
  };

  _GitMock.prototype.commit  = function () {
    return this;
  };

  return new _GitMock();
};

module.exports = SimpleGitMock;
