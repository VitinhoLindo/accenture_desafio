const Modules = require('../../resources/Modules');

class Config extends Modules {
  config = {
    host: '127.0.0.1',
    port: 3000
  }

  constructor() { super(); }

  getMaxRequestMinute() {
    let value = this.process.env.MAX_REQUEST_MINUTE;

    value = parseInt(value) || 100;

    return value;
  }

  getConfig() {
    if (this.process.env.HOST) this.config.host = this.process.env.HOST;
    if (this.process.env.PORT) this.config.port = this.process.env.PORT;

    return this.config;
  }
}

module.exports = Config;