require('dotenv').config();
const server = require('./server');
server.testDatabaseConnection();
server.listen();