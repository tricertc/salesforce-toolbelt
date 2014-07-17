/**
 * @param {Object} config
 * @param {Function} start callback
 * @param {Function} done callback
 * @param [{*}] optional
 */
module.exports = function (config, start, done, foo, bar, baz) {
  return foo + bar + baz;
};
