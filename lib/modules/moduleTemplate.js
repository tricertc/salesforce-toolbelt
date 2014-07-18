/**
 * @param {Object} config
 * @param {Function} start callback
 * @param {Function} done callback
 * @param {String} foo
 * @param {String} bar
 * @param {String} baz
 */
module.exports = function (config, start, done, foo, bar, baz) {
  return foo + bar + baz;
};
