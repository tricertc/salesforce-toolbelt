module.exports = (function() {

  /**
   * Constructor
   * @param {Object} config
   * @param {Object} options
   */
  function Module(config, options) {
    options = options || {};

    this._config = config;
    this._name = options.hasOwnProperty('name') ? options.name : 'anonymous';
    this._args = options.hasOwnProperty('args') ? options.args : [];
  }

  /**
   * Print header with module and environment name
   */
  Module.prototype.printHeader = function () {
    console.log('===============================================================================');
    console.log('- Module:      ' + this.getName().toUpperCase());
    console.log('- Environment: ' + this.getConfig().name.toLowerCase());
    console.log('===============================================================================');
    console.log('');
  };

  /**
   * Print footer
   */
  Module.prototype.printFooter = function () {
    console.log('');
    console.log('===============================================================================');
    console.log('- Completed:   ' + this.getName().toUpperCase());
    console.log('===============================================================================');
  };

  /**
   * Get module configuration
   * @return {Object} module configuration
   */
  Module.prototype.getConfig = function () {
    return this._config;
  };

  /**
   * Get module name
   * @return {String}
   */
  Module.prototype.getName = function () {
    return this._name;
  };

  /**
   * Get module arguments
   * @return {Array}
   */
  Module.prototype.getArgs = function () {
    return this._args;
  };

  /**
   * Invokes module execution
   * @return {*} optional results of module
   */
  Module.prototype.init = function () {
    if (!this._initFunc)
      throw new Error('Module init function has not been set');

    return this._initFunc.apply(null, [
      this._config,
      this.printHeader.bind(this),
      this.printFooter.bind(this)
    ].concat(this._args));
  };

  /**
   * Set module init function
   * @param {Function} func
   */
  Module.prototype.setInitFunc = function (func) {
    if (typeof func !== 'function')
      throw new Error('Module#setInitFunc() requires a function');
    this._initFunc = func;
  };

  return Module;
})();
