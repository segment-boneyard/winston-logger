var defaults = require('defaults');
var transports = require('./transports');
var winston = require('winston');

/**
 *
 * WinstonLogger class to create loggers
 *
 * @param winston
 * @param options
 * @constructor
 */
function WinstonLogger(winston, options){
  this.winston = winston || require('winston');
  this.options = options || {};

  this.options.colors = defaults(this.options.colors, {
      silly    : 'magenta',
      verbose  : 'blue',
      debug    : 'cyan',
      info     : 'green',
      warn     : 'yellow',
      error    : 'red',
      critical : 'red',
      fatal    : 'red'
  });

  this.options.levels = defaults(this.options.levels, {
      silly: 0,
      verbose: 1,
      debug: 2,
      info: 3,
      warn: 4,
      error: 5,
      critical: 6,
      fatal: 7
  });
}

/**
 * Create a logger.
 *
 * @param {Object} options
 * @return {Logger}
 */

WinstonLogger.prototype.create = function (options) {
  if (!options) throw new Error('Winston logger must be initialized with options.');

  this.winston.addColors(this.options.colors);// set global winston colors
  this.winston.setLevels(this.options.levels); // set global winston levels

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
  logger.setLevels(this.options.levels);
  return logger;
};

/**
 * Expose an `WinstonLogger` instance.
 */

module.exports = function(winston, options){
    return new WinstonLogger(winston, options);
};