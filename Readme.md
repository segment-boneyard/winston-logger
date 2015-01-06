# winston-logger

  Create a winston logger using a simple API.

## Example

```js
var winstonLogger = require('winston-logger')();

var logger = winstonLogger.create({ console: true });
logger.info(..)
```

Here's an example `development` option set:

```js
{
  "console" : true
}
```

And `production` options:

```js
{
    "file"    : true,
    "console" : false,
    "mail"    : {
      "to": "alerts@company.com",
      "from": "errors@company.com",
      "level": "critical",
      "host": "smtp.sendgrid.net",
      "username": "sendgrid_user",
      "password": "sendgrid_pass",
      "ssl": false
    },
    "papertrail" : {
      "host": "logs.papertrailapp.com",
      "port": 10000,
      "level": "error"
    }
  }
```

## API

#### WinstonLogger(winston, options)

    Create an instance of WinstonLogger with the given winston module and the given options

###### Usage

Give winston logger the wanted winston module

```js
var winstonLogger = require('winston-logger')(require('winston'));
// verbose way: winston is unused
var winston = require('winston'),
    winstonLogger = require('winston-logger')(winston)
// shortest way: winston will be loaded by winston-logger
// will load the version in winston-logger's package json
var winstonLogger = require('winston-logger')();
```

Configure colors and labels with the 'options' parameter

```js
var options = {
    colors: {
              silly    : 'magenta',
              verbose  : 'blue',
              debug    : 'cyan',
              info     : 'green',
              warn     : 'yellow',
              error    : 'red',
              critical : 'red',
              fatal    : 'red'
            },
    labels: {
              silly: 0,
              verbose: 1,
              debug: 2,
              info: 3,
              warn: 4,
              error: 5,
              critical: 6,
              fatal: 7
            }
};

var winstonLogger = require('winston-logger')(require('winston'), options);
```


#### WinstonLogger.create(options)

    Create a winston logger with provided transports in the options.

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

