const { EventEmitter } = require('events');

class MyEvent extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(Infinity);
  }
}

module.exports = MyEvent;