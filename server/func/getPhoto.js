var tool = require('../tools/tool');
var fs = require('fs');
var url = require('url');

function getPhoto(request, response) {
    var param = tool.getDataFromGet(request);
    console.log(param);
    fs.readFile(CONFIG.photo.saveDir + '/' + param.picurl, function(err, d){
        tool.sendPhotoToClient(response,
            'image/jpg',
            d
        );
    });
}


module.exports = getPhoto;
