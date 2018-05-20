const socket = io(); // Initializing io request
socket.on('connect', function() {
    console.log('Connected to server');
});
socket.on('disconnect', function() {
    console.log('This is disconnected from server');
});

socket.on('newMessage', message => {
    console.log('Got a new message: ', message);
});

/* socket.emit('createMessage', {
    from: 'Me',
    text: 'Hello server'
}); */