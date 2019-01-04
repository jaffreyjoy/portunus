const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { checkDb } = require('./database');

io.on('connection', function(socket) {
    socket.on('checkDb', async function(name, res) {
        const user = await checkDb(name);
        res(user);
    });
});

server.listen(process.env.PORT || 3000, function() {
    console.log('Express server listening on '+server.address().port);
});