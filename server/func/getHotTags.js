var db = require('../db/mongo');
var tool = require('../tools/tool');

function getHotTags(request, response){
    if (!tool.checkPassCode(request)){
        tool.sendDataToClient(response, {
            error:1,
            msg:'PassCode check faild.'
        });
        return;
    }
    var pageSize;
    try {
        var data = JSON.parse(request.body.data);
        pageSize = data.pageSize;
    } catch (e) {
        tool.sendDataToClient(response, {
            error:1001,
            msg:'Invalid data.'
        });
        return;
    }
    db.findHotTags(pageSize, function(data){
        var r = [];
        for (var i in data){
            r.push({
                tag:data[i].tag
            });
        }
        tool.sendDataToClient(response, {
            error:0,
            data:r
        });
    });
}

module.exports = getHotTags;
