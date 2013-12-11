
var defaults = require('defaults');
var fs = require('fs');
var path = require('path');
var winston = require('winston');


/**
 * Expose `file`.
 */

module.exports = file;


/**
 * Create a file transport.
 *
 * @param {Object} options
 * @return {Transport}
 */

function file (options) {
  options = defaults(options, {
    level: 'info',
    name: guessAppName() + '.log',
    directory: 'logs',
    maxSize: 1024 * 1024 * 10, // 10mb files
    maxFiles: 10,
    colorize: false,
    timestamp: true,
    json: false
  });

  var directory = path.join(process.cwd(), options.directory);
  ensureLogDir(directory);

  var filename = path.join(directory, options.name);
  options.filename = filename;

  return new winston.transports.File(options);
}


/**
 * Attempts to guess the app name from the folder of
 * the launched script.
 *
 * @return {string} App name
 */
var guessAppName = function () {
  var tokens = path.dirname(process.argv[1]).split(path.sep);
  return tokens[tokens.length-1];
};


/**
 * Ensure that the log directory is created.
 * Runs sync because it is not an often used operation.
 *
 * @param {String} dir
 */

var ensureLogDir = function (dir) {
  var dirExists = fs.existsSync(dir);
  if (!dirExists) fs.mkdirSync(dir);
};