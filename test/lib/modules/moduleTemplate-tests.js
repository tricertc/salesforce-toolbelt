var assert = require('assert');
var template = require('../../../lib/modules/moduleTemplate');

describe('moduleTemplate.js', function () {
  it('should return three strings concatenated', function () {
    var result = template(null, null, null, 'foo', 'bar', 'baz');
    assert.strictEqual('foobarbaz', result);
  });
});
