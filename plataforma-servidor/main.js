require('dotenv').config();
const Server = require('./Http')(__dirname);

Server.listen();