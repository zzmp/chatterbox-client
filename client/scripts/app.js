// YOUR CODE HERE:

(function() {
  var messageToHtml = function (message) {
    var li = $('<li></li>')
      .data('room' , message.roomname) // unsanitary
      .data('user' , message.username);  // unsanitary

    var text = $('<div></div>')
      .addClass('message')
      .text(message.text);

    var user = $('<div></div>')
      .addClass('username')
      .text(message.username)
      .on('click', app.addFriend);

    li.append(text).append(user);

    return li;
  };

  var app = {};

  app.init = function () {};

  app.send = function (message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
  };

  app.fetch = function () {
    $.ajax(undefined, {
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      // success: app.addMessage
    });
  };

  app.clearMessages = function () {
    $('#chats').empty();
  };

  app.addMessage = function (message) {
    $('#chats').append(messageToHtml(message));
    // app.addRoom(message.roomname); // unsanitary
  };

  app.addRoom= function (room) {
    if (!$("#roomSelect option[value='" + room + "']").length) {
      var option = $('<option></option>')
        .attr('value', room)
        .text(room);

      $('#roomSelect').append(option);
    }
  };

  app.addFriend = function (user) {
    // TODO: add friend on click
  };

  app.handleSubmit = function() {
    app.send({
      username: 'zz', // TODO: get window.location.search
      text: $('input #message').val(), //unsanitary
      roomname: 'zz'
    }); // unsanitary
  };

  this.app = app;
}() );

$(document).ready(function(){
  var submit = $('#send');

  submit.on('submit', function() {
    app.handleSubmit();
  });
});
