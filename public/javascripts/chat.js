(function(root) {
  var ChatRoom = root.ChatRoom = (root.ChatRoom || {});

  var Chat = ChatRoom.Chat = function (socket) {
    this.socket = socket,
    this.commandHash = {
      '/nick' : function(body) {
        this.socket.emit('nicknameChange', body )
      },
      'join' : function(body) {}
    }
  }

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit("message", message);
  }

  Chat.prototype.processCommand = function (command, body) {
    this.commandHash[command].bind(this)(body);
  }
})(this);