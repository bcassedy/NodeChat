var router = require('../router')
, socketIo = require('socket.io')
, _ = require('underscore')

function createChat(server) {
  var io = socketIo.listen(server)
  var guestnumber = 1;
  var nicknames = {};
  io.sockets.on('connection', function (socket) {
    guestnumber += 1;
    nicknames[socket.id] = 'Guest_' + guestnumber;
    io.sockets.emit("usersChange", _.values(nicknames));
    console.log('Socket connected');

    socket.on('message', function (message) {
      message = nicknames[socket.id] + ': ' + message;
      socket.broadcast.emit('newMessage', message);
    });

    socket.on('nicknameChange', function (newName) {
      if (newName.slice(0,5) === "Guest") {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Names cannot begin with Guest'
        });
      } else {
        socket.emit('nicknameChangeResult', {
          success: true,
          message: 'Your new name is now: ' + newName
        })
        nicknames[socket.id] = newName;
        io.sockets.emit("usersChange", _.values(nicknames));
      }
    });

    socket.on('disconnect', function () {
      delete nicknames[socket.id];
      socket.broadcast.emit("usersChange", _.values(nicknames));
      console.log(nicknames);
    })
  });
}



module.exports = createChat;