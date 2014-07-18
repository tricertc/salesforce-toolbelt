var assert = require('assert');

describe('config.js', function () {

  describe('when NODE_ENV is not defined', function () {
    it('should throw an exception', function () {
      delete process.env.NODE_ENV;
      assert.throws(function () {
        require('../../config/config');
      }, /NODE_ENV is not defined/);
    });
  });

  describe('#load()', function () {
    it('should throw exception if no matching configuration', function () {
      process.env.NODE_ENV = 'not-found';
      assert.throws(function () {
        require('../../config/config').load();
      }, /No configuration found for 'not-found'/);
    });

    it('should return matching configuration file for environment', function () {
      process.env.NODE_ENV = 'config.template';
      var config = require('../../config/config').load();
      assert.equal(true, !!config);
    });

    it('should set the name property on the configuration file', function () {
      process.env.NODE_ENV = 'config.template';
      var config = require('../../config/config').load();
      assert.equal('config.template', config.name);
    });
  });

});
