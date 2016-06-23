var crypto = require('crypto');
var CONFIG = require('../config');
var url = require('url');
var queryString = require("querystring");

function getEncryptCode(data){
    // console.log(CONFIG.photo.encryptMethod);
    var hash = crypto.createHmac(CONFIG.photo.encryptMethod, '').update(data).digest('hex');
    return hash;
}
function getDataFromGet(request){
    var getData = url.parse(request.url,true).query;
    var getData1 = queryString.parse(getData);
    return getData;
}
function getClientIp(request) {
    return request.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}
function getDataFromPost(request, response, callback){
    var postData = '';
    request.addListener('data', function(data){
        postData+=data;
    });
    request.addListener('end', function(){
//      var from = webTools.getDataFromGet(request);
//      console.log(from);
 //       console.log(postData);
        callback(request, response, postData);
    });
}

// Send the response to client and end this collection
function sendDataToClient(response, data){
    response.writeHead(200);
    response.write(JSON.stringify(data));
    response.end();
}

// Send the response to client and end this collection
function sendPhotoToClient(response, mime, data){
    response.writeHead(200);
    // response.writeHead('Content-Type: ' + mime);
    response.write(data);
    response.end();
}

function checkPassCode(request){
    try {
        // var d = JSON.parse(request.body.data);
        return JSON.parse(request.body.data).passCode === passCode;
    } catch (e) {
        return false;
    }
}

exports.getDataFromGet = getDataFromGet;
exports.getDataFromPost = getDataFromPost;
exports.getClientIp = getClientIp;

exports.getEncryptCode = getEncryptCode;
exports.sendDataToClient = sendDataToClient;
exports.sendPhotoToClient = sendPhotoToClient;
exports.checkPassCode = checkPassCode;
