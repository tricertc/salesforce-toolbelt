/**
 * Converts a hyphenated string to camel case
 * 	ex: 'my-module' returns 'myModule'
 */
String.prototype.toCamelCase = function () {
  return this.toString().toLowerCase().replace(/(-[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('-', '');
  });
};
