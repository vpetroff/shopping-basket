var http = require('http');
var app = require('./app/app');

var port = '3300';

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = 'port ' + addr.port;

  console.log('Listening on ' + bind);
}

app.set('port', port);

var server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

server.listen(port);
