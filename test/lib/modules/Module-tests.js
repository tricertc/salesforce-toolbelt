var assert = require('assert');
var Module = require('../../../lib/modules/Module');

describe('Module.js', function () {
  describe('#constructor()', function () {
    it('should assign a default name', function () {
      var module = new Module();
      assert.strictEqual('anonymous', module.name);
    });

    it('should assign a default args array', function () {
      var module = new Module();
      assert.deepEqual([], module.args);
    });

    it('should accept an optional name', function () {
      var module = new Module({ name: 'foo' });
      assert.strictEqual('foo', module.name);
    });

    it('should accept an optional args array', function () {
      var module = new Module({ args: [ 'foo', 'bar', 'baz'] });
      assert.deepEqual(['foo', 'bar', 'baz'], module.args);
    });
  });
});
