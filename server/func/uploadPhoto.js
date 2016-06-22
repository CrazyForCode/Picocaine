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
            // res['hash'] = hash;
            // console.log(multipartData.parts['test'].body);
            var d;
            try {
                d = JSON.parse(multipartData.parts['data'].body);
                // console.log(multipartData.parts['photo']);
                mongo.isPhotoHashExists(hash, function(result){
                    // res['isExists'] = result;
                    var res = {};
                    if(result === true){
                        //The photo exists in file.
                        res = {
                            error:1002,
                            msg:'Photo already exists.'
                        }
                        tool.sendDataToClient(response, res);
                    }
                    else{
                        var fileName = hash + '.' + multipartData.parts['photo'].mime.split('/')[1];
                        // console.log(new Buffer(multipartData.parts['photo'].body));
                        var wd = new Buffer(multipartData.parts['photo'].body, 'ascii');
                        console.log(wd);
                        fs.writeFile(CONFIG.photo.saveDir + '/' + fileName,
                            wd,
                            'binary',
                            function(err,res){
                            if(err){
                                console.log(err);
                                // res.error = 1000;
                                // res.msg = 'Upload photo faild.';
                                res = {
                                    error:1000,
                                    msg:'Upload photo faild.'
                                }
                            }
                            else{
                                mongo.savePhoto(hash, d.tags);
                                res = {
                                    error:0,
                                    data:{
                                        picurl:fileName
                                    }
                                };
                            }
                            tool.sendDataToClient(response, res);
                        });
                    }
                    // console.log(res);

                });
            } catch (e) {
                res = {
                    error:1001,
                    msg:'Invalid data.'
                }
                tool.sendDataToClient(response, res);
            }
	}
}

module.exports = uploadPhoto;
