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

socket.on('newLocationMessage', message => {
    const li = $('<li></li>');
    const a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);
});

/* socket.emit('createMessage', {
    from: 'Me',
    text: 'Hello server'
}, function(data) {
    console.log('Got it: ', data);
}); */

$("#message-form").on('submit', function(event) {
    event.preventDefault();

    const messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(response) {
        messageTextBox.val('');
    });
});

const locationButton = $("#send-location");
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supprted by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Position', position);
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function() {
            alert('Unable to fetch location');
        });
    }
});