var http = require("http");
var CONFIG = require('./config');
/**
 * 创建服务器
 */
var server = http.createServer(function(request, response){
	// console.log(request, response);
    response.writeHead(200);
    response.write('This is Picocaine server, I\'m coding amazing...');
    response.end();
});

// /**
//  * 设置监听
//  */
// exports.start=function(){
//     server.listen(8888);
// }
// var net = require("net");
// var server1 = net.createServer(function(conn){
//     console.log("connection");
//     conn.on("data", function(data){
//         console.log(data.toString());
//         conn.write("back:"+data);
//     });
//     conn.write("OK");
// });

// server1.listen(2222, function(){
//     console.log("start");
// });
// /**
//  * 设置监听
//  */
// exports.start=function(){
//     server.listen(8888);
// }

server.listen(CONFIG.port);