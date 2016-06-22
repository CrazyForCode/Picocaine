var tool = require('../tools/tool');
var MultipartParser = require('../tools/MultipartParser.js');
var mongo = require('../db/mongo');
var fs = require('fs');
var gm = require('gm')
,	imageMagick = gm.subClass({ imageMagick : true });

function uploadPhoto(request, response) {
    // console.log(req.files);
    // var path = req.files.photo.path;	//获取用户上传过来的文件的当前路径
    //   var sz = req.files.photo.size;
    //   console.log(path);
    //   if (sz > 2*1024*1024) {
    //     fs.unlink(path, function() {	//fs.unlink 删除用户上传的文件
    //       res.end('1');
    //     });
    //   } else if (req.files.photo.type.split('/')[0] != 'image') {
    //     fs.unlink(path, function() {
    //       res.end('2');
    //     });
    //   } else {
    //     imageMagick(path)
    //     .resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
    //     .autoOrient()
    //     .write(CONFIG.photo.saveDir + '/' +req.files.photo.name, function(err){
    //       if (err) {
    //         console.log(err);
    //         res.end();
    //       }
    //       fs.unlink(path, function() {
    //         return res.end('3');
    //       });
    //     });
    //   }
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
        res = {
            error:1001,
            msg:'Invalid data.'
        }
        tool.sendDataToClient(response, res);
    }
}
function onDataGetFromPost(request, response, data){
    // console.log(data);
    // console.log(data);
    var res = {};

	// var multipartData = new MultipartParser(request.headers['content-type'], data);
	var hash = tool.getEncryptCode(data);
    // res['hash'] = hash;
    // console.log(multipartData.parts['test'].body);
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
                var fileName = hash + '.' + request.files.photo.type.split('/')[1];
                // console.log(new Buffer(multipartData.parts['photo'].body));
                // var wd = new Buffer(multipartData.parts['photo'].body, 'ascii');
                // console.log(wd);
                fs.writeFile(CONFIG.photo.saveDir + '/' + fileName,
                    data,
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
                        tool.sendDataToClient(response, res);
                    }
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
