var winston = require('winston');
var defaults = require('defaults');


/**
 * Expose `console`.
 */

module.exports = console;


/**
 * Create a console transport.
 *
 * @param {Object} options
 * @return {Transport}
 */

function console (options) {
  options = defaults(options, {
    level: 'info',
    colorize: true,
    prettyPrint: true,
    timestamp: false,
    handleExceptions: true
  });

  return new winston.transports.Console(options);
}
