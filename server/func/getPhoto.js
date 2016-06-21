var tool = require('../tools/tool');

function getPhoto(request, response) {
    tool.getDataFromPost(request, response, onDataGetFromPost);
}
function onDataGetFromPost(request, response, data){
    console.log(data);
    tool.sendDataToClient(response, typeof data);
}

module.exports = getPhoto;
