const Middleware = require('./Middleware');
const Config     = require('./Config'); 
const Modules    = require('../resources/Modules');

class Server extends Modules {


  async listen() {
    const serverConfig = Config.getConfig();

    Middleware(this.express, this);
    const server = this.http.createServer(this.express);
    server.listen(serverConfig, () => {
      console.log(`server open in http://${serverConfig.host}:${serverConfig.port}/`);
    });
  }
}

module.exports = () => {
  let server = new Server();

  return server;
};