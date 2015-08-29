var express = require('express');

var app = express();

var port = process.env.PORT || 8081;

var server = app.listen(port, function(){
 console.log('running on port: ' + port);
});

var io = require('socket.io')(server);

var pub = require('redis').createClient(6379,'tmh1981.redis.cache.windows.net', 
	{auth_pass: 'DNkysQyYS6SZfbUzGzOK4vW1fWEp9NVtqcqekmYaNQ4=', return_buffers: true});
var sub = require('redis').createClient(6379,'tmh1981.redis.cache.windows.net', 
	{auth_pass: 'DNkysQyYS6SZfbUzGzOK4vW1fWEp9NVtqcqekmYaNQ4=', return_buffers: true});

var redis = require('socket.io-redis');
io.adapter(redis({pubClient: pub, subClient: sub}));

app.use(express.static(__dirname + '/public'));

app.get('/t', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.set('Content-Type', 'text/plain');
    res.send("done");
});


var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
 


module.exports = app;









