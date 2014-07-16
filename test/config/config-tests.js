var assert = require('assert');

describe('config.js', function () {

  var modulePath = '../../config/config';

  describe('when NODE_ENV is not defined', function () {
    it('should throw an exception', function () {
      delete process.env.NODE_ENV;
      assert.throws(function () {
        require(modulePath);
      }, /NODE_ENV is not defined/);
    });
  });

  describe('when NODE_ENV is defined', function () {
    it('should throw exception if no matching configuration', function () {
      process.env.NODE_ENV = 'not-found';
      assert.throws(function () {
        require(modulePath)();
      }, /No configuration found for 'not-found'/);
    });

    it('should return matching configuration file for environment', function () {
      process.env.NODE_ENV = 'config.template';
      var config = require(modulePath)();
      assert.equal(true, !!config);
    });
  });

});
