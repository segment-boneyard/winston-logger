
var defaults = require('defaults');
var os = require('os');
var winston = require('winston-mail');


/**
 * Expose `mail`.
 */

module.exports = mail;


/**
 * Create a mail transport.
 *
 * @param {Object} options
 * @return {Transport}
 */

function mail (options) {
  options = defaults(options, {
    timestamp: true,
    prettyPrint: true
  });

  if (options.subject)
    options.subject = '[' + os.hostname() + '] - ' + options.subject;

  return new winston.Mail(options);
}