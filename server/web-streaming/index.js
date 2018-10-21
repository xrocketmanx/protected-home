const SocketEvents = require('./socket-events');

exports.startServer = function (server) {
  const socketEvents = new SocketEvents();
  socketEvents.open(server);
};