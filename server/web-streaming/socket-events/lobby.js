class Lobby {
  constructor() {
    this.rooms = {};
  }

  on(room, socket) {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    this.rooms[room].push(socket);
  }

  broadcast(sender, room, message) {
    if (this.rooms[room]) {
      let sockets = this.rooms[room];
      for (let socket of sockets) {
        if (socket !== sender) {
          socket.send(message);
        }
      }
    }
  }

  off(socket) {
    Object.keys(this.rooms).forEach(room => {
      this.unsubscribe(room, socket);
    });
  }

  unsubscribe(room, socket) {
    this.rooms[room] = this.rooms[room].filter(_socket => socket !== _socket);
  }
}

module.exports = Lobby;