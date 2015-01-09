var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8124, function(){
  console.log('listening on :8124');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.on('addme',function(username) {
		socket.username = username;
		socket.emit('chat', 'SERVER', 'You have connected'); 
		socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
	});

	socket.on('sendchat', function(data) { 
		io.sockets.emit('chat', socket.username, data);
	});

	socket.on('disconnect', function() {
		io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
	});
});