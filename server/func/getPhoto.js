var tool = require('../tools/tool');
var fs = require('fs');
var url = require('url');

function getPhoto(request, response) {
    var param = tool.getDataFromGet(request);
    // console.log(param);
    var url = param.picurl;
    var hash = param.picurl.match(/[a-f0-9]+/)[0];
    // console.log(hash);
    switch (param.quality) {
        case 'big':
        case 'small':
            url = hash + "-" + param.quality + '.' + param.picurl.split('.')[1];
            break;
        case 'source':
            break;
        default:
            var res = {
                error:1001,
                msg:'Invalid data.'
            }
            tool.sendDataToClient(response, res);
            return;
            break;
    }
    // console.log(url);
    fs.readFile(CONFIG.photo.saveDir + '/' + url, function(err, d){
        if (err){
            var res = {
                error:1003,
                msg:"Photo not exists."
            }
            tool.sendDataToClient(response, res);
        }
        else{
            tool.sendPhotoToClient(response,
                'image/jpg',
                d
            );
        }
    });
}


module.exports = getPhoto;
