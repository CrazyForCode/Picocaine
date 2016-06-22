
var express = require('express')
  , router = require('./router')
  , http = require('http');
  var CONFIG = require('./config');
  global.CONFIG = CONFIG;
var app = express();

// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

app.get('*', router.route);
app.post('*', router.route);

http.createServer(app).listen( CONFIG.port, function(){
  console.log("Server running at http://localhost:" + CONFIG.port);
});
