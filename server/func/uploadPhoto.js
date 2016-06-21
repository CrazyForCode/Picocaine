var tool = require('../tools/tool');
var MultipartParser = require('../tools/MultipartParser.js');
var mongo = require('../db/mongo');
var fs = require('fs');

function uploadPhoto(request, response) {
    tool.getDataFromPost(request, response, onDataGetFromPost);
}
function onDataGetFromPost(request, response, data){
    // console.log(data);
    // console.log(data);
    var res = {};
    if ( request.headers.hasOwnProperty('content-type') ) {
            // onDataGetFromPost(request, response, '');
			var multipartData = new MultipartParser(request.headers['content-type'], data);
			var hash = tool.getEncryptCode(multipartData.parts['photo'].body);
            res['hash'] = hash;
            console.log(multipartData.parts['test'].body);
            // console.log(multipartData.parts['photo']);
            mongo.isPhotoHashExists(hash, function(result){
                res['isExists'] = result;
                if(res === true){
                    //The photo exists in file.
                }
                else{
                    var fileName = hash + '.' + multipartData.parts['photo'].mime.split('/')[1];
                    console.log(fileName);
                    // fs.writeFile(CONFIG.saveDir + )
                }
                // console.log(res);
                tool.sendDataToClient(response, res);

            });
	}
}

module.exports = uploadPhoto;
