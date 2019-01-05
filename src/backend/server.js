const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const { connectDb } = require('./database');
const auth = require('./auth');

io.on('connection', function(socket) {
    socket.on('register', async function(user, respond) {
        const res = await auth.register(user);
        respond(res);
    })
});

connectDb(function() {
    server.listen(process.env.PORT || 3000, function() {
        console.log('Express server listening on '+server.address().port);
    });
})