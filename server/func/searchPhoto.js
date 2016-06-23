var db = require('../db/mongo');
var tool = require('../tools/tool');
function searchPhoto(request, response){
    if (!tool.checkPassCode(request)){
        tool.sendDataToClient(response, {
            error:1,
            msg:'PassCode check faild.'
        });
        return;
    }
    var tag;
    var page, pageSize;
    try {
        var data = JSON.parse(request.body.data);
        tag = data.tag;
        page = data.page;
        pageSize = data.pageSize;
    } catch (e) {
        tool.sendDataToClient(response, {
            error:1001,
            msg:'Invalid data.'
        });
        return;
    }
    db.searchPhotoByTags(tag, page, pageSize, function(doc){
        var r = [];
        for(var i in doc){
            // console.log(i);
            r.push({
                picurl:doc[i].hash + '.' + doc[i].type,
                tags:doc[i].tags
            });
        }
        tool.sendDataToClient(response, {
            error:0,
            data:r
        });
    })
}

module.exports = searchPhoto;
