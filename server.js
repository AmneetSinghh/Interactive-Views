var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));

// First of all I will add the new pages death mode and the simple mode.


// First of all I will add the new pages death mode and the simple mode.
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/single', function(req, res) {
    res.sendFile(__dirname + '/public/single.html');
});

app.get('/death', function(req, res) {
    res.sendFile(__dirname + '/public/death.html');
});

app.get('/multiplayer', function(req, res) {
    res.sendFile(__dirname + '/public/multiplayer.html');
});


let players = {}; // empty players;

// io.on('connection', function(socket) {
// socket.emit('test', "This is from the server");
// socket.on('test1', msg => {
//     socket.broadcast.emit('Server to all clients!');
// });

// socket.on('client_to_client', data => {
//     socket.broadcast.emit('server_to_client', data);

// });
// socket.on('update', data => {
//     console.log("Position is-> ", data);

// });
// socket.on('new_player', data => { // data is the player starting position
//     console.log("New client Connected with connected id!", socket.id);
//     players[socket.id] = data;
//     console.log("Starting position: ", players[socket.id].x, players[socket.id].y);
//     console.log("Current number of players: ", Object.keys(players).length);
//     console.log("PLayers Dictionary-> ", players);
//     io.emit('update_players', players); // dictionary of players
// });

// socket.on('disconnect', function() {
//     delete players[socket.id];
//     console.log("Goodbye client with id-> ", socket.id);
//     console.log("Current number of playres: ", Object.keys(players).length);
//     io.emit('update_players', players);

// });


// });





// now from next First of all we have to learn the node.js in detial or in deep then after only we will be able to do this functionality.

http.listen(process.env.PORT || 3000, function() {
    console.log("SERVER STARTED PORT: 3000");
});