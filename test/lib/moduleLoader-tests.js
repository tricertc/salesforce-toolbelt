var assert = require('assert');
var Module = require('../../lib/modules/Module');

describe('moduleLoader.js', function () {

  describe('when process.argv[2] is not defined', function () {
    it('should throw an exception', function () {
      delete process.argv[2];
      assert.throws(getModuleLoader, /No module defined/);
    });
  });

  describe('#load()', function () {
    it('should throw an exception if module is not found', function () {
      process.argv[2] = 'not-found';
      assert.throws(function () {
        var loader = getModuleLoader();
        loader.load();
      }, /Module 'not-found' not found/);
    });

    it('should return an instance of Module', function () {
      process.argv[2] = 'module-template';

      var loader = getModuleLoader();
      var module = loader.load();

      assert.equal(true, module instanceof Module);
    });

    it('should assign a name to the module', function () {
      process.argv[2] = 'module-template';

      var loader = getModuleLoader();
      module = loader.load();

      assert.strictEqual('module-template', module.name);
    });

    it('should pass additional parameters to args array', function () {
      process.argv[2] = 'module-template';
      process.argv[3] = 'foo';
      process.argv[4] = 'bar';
      process.argv[5] = 'baz';

      var loader = getModuleLoader();
      var module = loader.load();

      assert.deepEqual(['foo', 'bar', 'baz'], module.args);
    });
  });

});

/**
 * get moduleLoader
 */
function getModuleLoader() {
  return require('../../lib/moduleLoader');
}
