
var defaults = require('defaults');
var transports = require('./transports');
var winston = require('winston');

/**
 * Expose `create`.
 */

module.exports = create;


/**
 * Create a logger.
 *
 * @param {Object} options
 * @return {Logger}
 */

function create (options) {
  if (!options) throw new Error('Winston logger must be initialized with options.');

  setColors(); // set global winston colors
  setLevels(winston); // set global winston levels

  var enabled = [];
  Object.keys(options).forEach(function (key) {
    var opts = options[key];
    if (!opts) return; // if the provider is disabled
    if (typeof opts !== 'object') opts = {};

    if (!transports[key]) {
      throw new Error('Failed to find transport ' + key);
    }

    var Transport = transports[key];
    var transport = Transport(opts);
    if (transport) enabled.push(transport);
  });

  var logger = new (winston.Logger)({ transports: enabled });
  setLevels(logger);
  return logger;
}


/**
 * Set Winston levels.
 *
 * @param {Logger} logger
 * @param {Object} levels
 */

function setLevels (logger, levels) {

  levels = defaults(levels, {
    silly: 0,
    verbose: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    critical: 6,
    fatal: 7
  });

  logger.setLevels(levels);
}


/**
 * Set global Winston levels.
 *
 * @param {Object} colors
 */

function setColors (colors) {

  colors = defaults(colors, {
    silly    : 'magenta',
    verbose  : 'blue',
    debug    : 'cyan',
    info     : 'green',
    warn     : 'yellow',
    error    : 'red',
    critical : 'red',
    fatal    : 'red'
  });

  winston.addColors(colors);
}