const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = socketIO(server); // creating socket server

io.on('connection', socket => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('Client is disconnected');
    });

   /*  socket.emit('newMessage', {
        from: 'Server',
        text: 'Hello everybody',
        createdAt: new Date().getTime()
    }); */

    socket.on('createMessage', message => {
        console.log('Message created: ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
});