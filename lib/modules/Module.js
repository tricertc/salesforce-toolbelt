module.exports = (function() {

  function Module(options) {
    options = options || {};
    this.name = options.hasOwnProperty('name') ? options.name : 'anonymous';
    this.args = options.hasOwnProperty('args') ? options.args : [];
  }

  return Module;
})();
