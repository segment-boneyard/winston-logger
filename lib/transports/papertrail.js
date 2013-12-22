
var defaults = require('defaults');


/**
 * Expose `papertrail`.
 */

module.exports = papertrail;


/**
 * Create a papertrail transport.
 *
 * @param {Object} options
 * @return {Transport}
 */

function papertrail (options) {
  options = defaults(options, {
    level: 'info',
    colorize: true,
    prettyPrint: true,
    timestamp: false
  });

  // this requires raven which does extra error hookups, so dont
  // want to require unless we're using it.
  var Papertrail = require('winston-papertrail').Papertrail;

  return new Papertrail(options);
}