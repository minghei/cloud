var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8081;



app.get('/', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.set('Content-Type', 'text/plain');
    res.send("done");
});
app.use(express.static(__dirname + '/public'));
io.on('connection', function(socket){
  console.log("connected");
  socket.on('disconnect', function () {
      console.log("disconnected");
  });
  socket.on('chat message', function (msg) {
      io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log("listening on :" + port);
});
