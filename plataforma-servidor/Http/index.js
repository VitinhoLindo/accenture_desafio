const Middleware = require('./Middleware');
const Config     = require('./Config'); 

class Server extends Config {
  __dirname = '';

  constructor() { super(); }

  async listen() {
    const serverConfig = this.getConfig();

    Middleware(this.express, this);
    const server = this.http.createServer(this.express);
    server.listen(serverConfig, () => {
      console.log(`server open in http://${serverConfig.host}:${serverConfig.port}/`);
    });
  }
}

module.exports = (dir) => {
  let server = new Server();
  server.__dirname = dir;

  return server;
};