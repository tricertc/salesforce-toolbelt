var assert = require('assert');

describe('string-helper.js', function () {
  var helper = require('../../../lib/helpers/string-helper');
  describe('#toCamelCase()', function () {
    it('should add a toCamelCase() method to string prototype', function () {
      var s = 'foo-bar-baz';
      assert.equal(true, String.prototype.hasOwnProperty('toCamelCase'));
      assert.equal(true, !!s.toCamelCase);
    });

    it('should convert a hyphenated string to camel case', function () {
      var s = 'foo-bar-baz';
      assert.strictEqual('fooBarBaz', s.toCamelCase());
    });
  });
});
