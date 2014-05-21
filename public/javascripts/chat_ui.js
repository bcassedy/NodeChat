var handleNewMessage = function (event) {
  event.preventDefault();
  var message = $('#message-input').val();

  var msgArray = message.split(' ');
  if (msgArray[0][0] === '/') {
    cmd = msgArray[0];
    body = msgArray.slice(1).join(' ');
    this.processCommand(cmd, body);
  } else {
    this.sendMessage(message);
    var messageDiv = $('<div></div>').text('Me: ' + message);
    $('#messages').prepend(messageDiv);
    $('#message-input').val("");
  }
};

var handleMessage = function (message) {
  var messageDiv = $('<div></div>').text(message);
  $('#messages').prepend(messageDiv);
};

var handleNameChange = function (nameChangeResult) {
  var messageDiv = $('<div></div>').text(nameChangeResult.message);
  $('#messages').prepend(messageDiv);
  $('#message-input').val("");
};

var handleUsersChange = function (users) {
  var usersUl = $('<ul id="users"></ul>');
  for (var i = 0; i < users.length; i++) {
    var userLi = $('<li></li>');
    userLi.text(users[i]);
    usersUl.append(userLi);
  }
  $('#users-div').html(usersUl);
}

$(document).ready(function () {
  var socket = io.connect();
  var chat = new ChatRoom.Chat(socket);
  chat.socket.on('newMessage', handleMessage.bind(chat));
  $('#new-message-form').on('submit', handleNewMessage.bind(chat));
  chat.socket.on('nicknameChangeResult', handleNameChange);
  chat.socket.on('usersChange', handleUsersChange);
});


