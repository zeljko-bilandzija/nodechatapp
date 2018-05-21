const socket = io(); // Initializing io request

function scrollToBottom() {
    // Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    const params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});
socket.on('disconnect', function() {
    console.log('This is disconnected from server');
});

socket.on('newMessage', message => {
    const formattedTime = moment(message.createdAt).format('HH:mm:ss');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
    /* 
    const li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    $("#messages").append(li); */
});

socket.on('newLocationMessage', message => {
    const formattedDate = moment(message.createdAt).format('HH:mm:ss');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedDate,
        url: message.url
    });
    $('#messages').append(html);
    scrollToBottom();
   /*  const li = $('<li></li>');
    const a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedDate}: `);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li); */
});

socket.on('updateUserList', users => {
    const ol = $('<ol></ol>');
    users.forEach(user => {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
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
        locationButton.attr('disabled', 'disabled').text('Sending location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function() {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location');
        });
    }
});