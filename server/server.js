const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = socketIO(server); // creating socket server

io.on('connection', socket => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', () => {
        console.log('Client is disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Message created: ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        if (callback) {
            callback('This is from the server');
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
});