const moment = require('moment');

const logger = {
  log: function() {
    console.log.apply(
      console,
      [
        `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`,
      ].concat(Array.prototype.slice.call(arguments))
    );
  },
  error: function() {
    console.error.apply(
      console,
      [
        `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`,
      ].concat(Array.prototype.slice.call(arguments))
    );
  },
};

module.exports = logger;
