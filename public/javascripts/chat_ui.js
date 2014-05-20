var handleNewMessage = function (event) {
  event.preventDefault();
  var message = $('#message-input').val();
  this.sendMessage(message);
  var messageDiv = $('<div></div>').text(message);
  $('#messages').prepend(messageDiv);
  $('#message-input').val("");
};

var handleMessage = function (message) {
  var messageDiv = $('<div></div>').text(message);
  $('#messages').prepend(messageDiv);
};

$(document).ready(function () {
  var socket = io.connect();
  var chat = new ChatRoom.Chat(socket);
  chat.socket.on('newMessage', handleMessage.bind(chat));
  $('#new-message-form').on('submit', handleNewMessage.bind(chat));
});


