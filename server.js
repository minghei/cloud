var express = require('express');

var app = express();

var port = process.env.PORT || 8081;


var server = require('http').createServer(app);
var io = require('socket.io')(server);
var pub = require('redis').createClient(6379,'tmh1981.redis.cache.windows.net', 
	{auth_pass: 'DNkysQyYS6SZfbUzGzOK4vW1fWEp9NVtqcqekmYaNQ4=', return_buffers: true});
var sub = require('redis').createClient(6379,'tmh1981.redis.cache.windows.net', 
	{auth_pass: 'DNkysQyYS6SZfbUzGzOK4vW1fWEp9NVtqcqekmYaNQ4=', return_buffers: true});

var redis = require('socket.io-redis');
io.adapter(redis({pubClient: pub, subClient: sub}));

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.set('Content-Type', 'text/plain');


    res.send("done");
});

app.listen(port, function(){
	console.log('running on port: ' + port);
});





 


module.exports = app;









