var assert = require('assert');
var Module = require('../../../lib/modules/Module');

describe('Module.js', function () {
  describe('#constructor()', function () {
    it('should assign a default name', function () {
      var module = new Module();
      assert.strictEqual('anonymous', module.getName());
    });

    it('should assign a default args array', function () {
      var module = new Module();
      assert.deepEqual([], module.getArgs());
    });

    it('should accept an optional name', function () {
      var module = new Module(null, { name: 'foo' });
      assert.strictEqual('foo', module.getName());
    });

    it('should accept an optional args array', function () {
      var module = new Module(null, { args: [ 'foo', 'bar', 'baz'] });
      assert.deepEqual(['foo', 'bar', 'baz'], module.getArgs());
    });
  });

  describe('#setInitFunc()', function () {
    it('should have a setInitFunc() method', function () {
      assert.equal(true, Module.prototype.hasOwnProperty('setInitFunc'));
    });

    it('should throw exception if argument is not a function', function () {
      var module = new Module();
      assert.throws(function () {
        //noinspection JSCheckFunctionSignatures
        module.setInitFunc('foo');
      }, /Module#setInitFunc\(\) requires a function/);
    });

    it('should set the init function', function () {
      var module = new Module();
      module.setInitFunc(function () {});
      assert.equal(true, !!module.init);
      assert.equal(true, typeof module.init === 'function');
    });
  });

  describe('#init()', function () {
    it('should throw exception if not set', function () {
      var module = new Module();
      assert.throws(function () {
        module.init();
      }, /Module init function has not been set/);
    });

    it('should execute the designated init function', function () {
      var module = new Module();
      module.setInitFunc(function () { return 'foo'; });
      assert.strictEqual('foo', module.init());
    });
  });
});
