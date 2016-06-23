var getPhoto = require('./func/getPhoto');
var uploadPhoto = require('./func/uploadPhoto');
var searchPhoto = require('./func/searchPhoto');
var url = require('url');

var handle = {}
handle['/getPhoto'] = getPhoto;
handle['/uploadPhoto'] = uploadPhoto;
handle['/searchPhoto'] = searchPhoto;

function route(request, response){
    var path=url.parse(request.url).pathname;
    console.log(path + ' handle');
    if(typeof handle[path] === 'function')
	{
        //设置相应的handle
		handle[path](request, response);
	}
	else
	{
        //如果页面不存在，返回404
		response.writeHead(404);
        response.write('Page not found.');
		response.end();
	}
}

exports.route = route;
