var router = require('../router')
, socketIo = require('socket.io')

function createChat(server) {
  var io = socketIo.listen(server)
  io.sockets.on('connection', function (socket) {
    console.log('Socket connected');
    socket.on('message', function (message) {
      console.log(message);
      socket.broadcast.emit('newMessage', message);
    });
  });
}



module.exports = createChat;