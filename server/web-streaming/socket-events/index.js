const WebSocketServer = require('ws');
const Lobby = require('./lobby');

const EVENT_TYPES = {
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  ACTION: 'ACTION'
};

class SocketEvents {
  constructor() {
    this.lobby = new Lobby();
  }

  open(server) {
    const socketServer = new WebSocketServer.Server({ server });
    socketServer.on('connection', socket => {
      socket.on('message', message => {
        const event = JSON.parse(message);

        switch (event.type) {
          case EVENT_TYPES.SUBSCRIBE: {
            this.lobby.on(event.room, socket);
            break;
          }
          case EVENT_TYPES.UNSUBSCRIBE: {
            this.lobby.unsubscribe(event.room, socket);
            break;
          }
          case EVENT_TYPES.ACTION: {
            this.lobby.broadcast(socket, event.room, message);
            break;
          }
        }
      });

      socket.on('close', () => {
        this.lobby.off(socket);
      });
    });
  }
}


module.exports = SocketEvents;
