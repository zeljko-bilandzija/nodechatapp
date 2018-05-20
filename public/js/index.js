const socket = io(); // Initializing io request
socket.on('connect', function() {
    console.log('Connected to server');
});
socket.on('disconnect', function() {
    console.log('This is disconnected from server');
});

socket.on('newMessage', message => {
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
    console.log('Got a new message: ', message);
});

/* socket.emit('createMessage', {
    from: 'Me',
    text: 'Hello server'
}, function(data) {
    console.log('Got it: ', data);
}); */

$("#message-form").on('submit', function(event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(response) {
        console.log('Response: ', response);
    });
});