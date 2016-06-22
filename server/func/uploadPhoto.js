var tool = require('../tools/tool');
var MultipartParser = require('../tools/MultipartParser.js');
var mongo = require('../db/mongo');
var fs = require('fs');
var gm = require('gm')
,	imageMagick = gm.subClass({ imageMagick : true });

function uploadPhoto(request, response) {
    try{
        var path = request.files.photo.path;
        if (request.files.photo.size > 1024*1024){
            res = {
                error:1003,
                msg:'Image too large.'
            }
            tool.sendDataToClient(response, res);
            return;
        }
        if (request.files.photo.type.indexOf('image') == -1){
            res = {
                error:1001,
                msg:'Invalid data.'
            }
            tool.sendDataToClient(response, res);
            return;
        }
        fs.readFile(path, function(err, data){
            onDataGetFromPost(request, response, data);
        });
    }
    catch (e) {
        //Params invalid.
        res = {
            error:1001,
            msg:'Invalid data.'
        }
        tool.sendDataToClient(response, res);
    }
}
function onDataGetFromPost(request, response, data){
    var res = {};
	var hash = tool.getEncryptCode(data);
    var d;
    try {
        d = JSON.parse(request.body.data);
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
                var fileType = request.files.photo.type.split('/')[1];
                var fileName = hash + '.' + fileType;
                fs.writeFile(CONFIG.photo.saveDir + '/' + fileName,
                    data,
                    'binary',
                    function(err,res){
                    if(err){
                        console.log(err);
                        res = {
                            error:1000,
                            msg:'Upload photo faild.'
                        }
                        tool.sendDataToClient(response, res);
                    }
                    else{
                        mongo.savePhoto(hash, d.tags);
                        res = {
                            error:0,
                            data:{
                                picurl:fileName
                            }
                        };
                        // console.log(fileType);
                        if (fileType != 'gif'){
                            gm(request.files.photo.path)
                                .size(function(err, size){
                                    console.log(err);
                                    var scaleX = CONFIG.photo.savePhotoSize, scaleY = CONFIG.photo.savePhotoSize;
                                    size.width>size.height?(scaleY = size.height/(size.width/CONFIG.photo.savePhotoSize)):(scaleX = size.width/(size.height/CONFIG.photo.savePhotoSize));
                                    // gm(request.files.photo.path)
                                    //     .resize(size.width * CONFIG.photo.compressSmallScale, size.height * CONFIG.photo.compressSmallScale)
                                    //     .autoOrient()
                                    //     .write(CONFIG.photo.saveDir + '/' + hash + '-small.' + fileType, function(){
                                    //
                                    //     });
                                    gm(request.files.photo.path)
                                        .resize(scaleX, scaleY)
                                        .autoOrient()
                                        .write(CONFIG.photo.saveDir + '/' + hash + '-small.' + fileType, function(){
                                            tool.sendDataToClient(response, res);
                                        });
                                });
                        }
                    }
                    // Compress image after response end.
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

module.exports = uploadPhoto;
