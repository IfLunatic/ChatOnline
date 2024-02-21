const express = require('express');
const app = express();
let server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
    console.log("Successfully connected");
    connections.push(socket);
    
    
    socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Successfully disconnected");
    });

    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', { nickname: data.nickname, message: data.message });
    });
});