'use strict';

var utils = require('./utils');

/**
 * Expose `helpers`
 */

var helpers = module.exports;

/**
 * Returns the first value if defined, otherwise the "default" value is returned.
 *
 * @param {any} `value`
 * @param {any} `defaultValue`
 * @return {String}
 * @alias .or
 * @api public
 */

helpers.default = function(value, defaultValue) {
  return value == null
    ? defaultValue
    : value;
};

/**
 * Return the given value of `prop` from `this.options`. Given the context `{options: {a: {b: {c: 'ddd'}}}}`
 *
 * ```handlebars
 * {{option "a.b.c"}}
 * <!-- results => `ddd` -->
 * ```
 *
 * @param {String} `prop`
 * @return {any}
 * @api public
 */

helpers.option = function(prop) {
  var opts = (this && this.options) || {};
  return utils.get(opts, prop);
};

/**
 * Block helper that renders the block without taking any arguments.
 *
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

helpers.noop = function(options) {
  return options.fn(this);
};

/**
 * Block helper that builds the context for the block
 * from the options hash.
 *
 * @param {Object} `options` Handlebars provided options object.
 * @contributor Vladimir Kuznetsov <https://github.com/mistakster>
 * @block
 * @api public
 */

helpers.withHash = function(options) {
  if (options.hash && Object.keys(options.hash).length) {
    return options.fn(options.hash);
  } else {
    return options.inverse(this);
  }
};

/**
 * Declare variable
 *
 * ```handlebars
 * {{var "foo" "bar"}}
 * {{foo}}
 * <!-- results => `bar` -->
 * ```
 *
 * @param {String} `name`
 * @param {String} `value`
 * @param {Obj} `context`
 * @api public
 */
helpers.var = function(name, value, context) {
  this[name] = value;
};

/**
 * Declare random ID as variable
 *
 * ```handlebars
 * {{randId "id"}}
 * {{id}}
 * <!-- results => `random between 1 - 256` -->
 * ```
 *
 * @param {String} `name`
 * @param {Obj} `context`
 * @api public
 */
helpers.randId = function(name, context) {
  var value = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
  this[name] = value;
};