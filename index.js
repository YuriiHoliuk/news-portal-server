const server = require('./server');

const port = +process.argv[2] || 3000;

server(port);