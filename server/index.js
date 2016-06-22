var CONFIG = require('./config');
var http = require("http");
var tool = require('./tools/tool');
var router = require('./router');
// var gm = require('gm');

global.CONFIG = CONFIG;
/**
 * 创建服务器
 */
var server = http.createServer(function(request, response){
	// console.log(request, response);
    router.route(request, response);
});

server.listen(CONFIG.port);
