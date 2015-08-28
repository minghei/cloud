var express = require('express');

var app = express();

var port = process.env.PORT || 8081;

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









