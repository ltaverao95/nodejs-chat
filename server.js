const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');

// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
    console.log('Server in port: ' , app.get('port'));
});

// websockets
const io = socketio(server);
io.on('connection', (socket) =>{
    console.log('New connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data); //Emit data to all users without exceptions
    });

    socket.on('chat:typing', (username) => {
        socket.broadcast.emit('chat:typing', username); //Emit data to all except current user typing
    });
});