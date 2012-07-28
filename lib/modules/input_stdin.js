var events = require('events'),
    util = require('util');

function InputStdin() {
  events.EventEmitter.call(this);
}

util.inherits(InputStdin, events.EventEmitter);

InputStdin.prototype.init = function(logger) {
  this.logger = logger;
  this.logger.info("Start monitoring stdin");
  process.stdin.resume();
  process.stdin.on('data', function (chunk) {
    this.emit('data', {
      '@source': 'stdin',
      '@message': chunk.toString().trim(),
    });
  }.bind(this));
  this.emit('ready');
}

InputStdin.prototype.close = function() {
  this.logger.info("Closing stdin");
}

module.exports = {
  create: function() {
    return new InputStdin();
  }
}