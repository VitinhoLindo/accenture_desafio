class Config {
  constructor() {}

  static getConfig() {
    const config = {
      host: '127.0.0.1',
      port: 3000
    };

    if (process.env.HOST) config.host = process.env.HOST;
    if (process.env.PORT) config.port = process.env.PORT;

    return config;
  }
}

module.exports = Config;