module.exports = (function() {

  function Module(options) {
    options = options || {};
    this.name = options.hasOwnProperty('name') ? options.name : 'anonymous';
    this.args = options.hasOwnProperty('args') ? options.args : [];
  }

  Module.prototype.init = function () {
    throw new Error('Module init function has not been set');
  };

  Module.prototype.setInitFunc = function (func) {
    if (typeof func !== 'function')
      throw new Error('Module#setInitFunc() requires a function');
    this.init = func;
  };

  return Module;
})();
