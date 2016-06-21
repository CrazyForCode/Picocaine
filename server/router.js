var getPhoto = require('./func/getPhoto');
var uploadPhoto = require('./func/uploadPhoto');
var url = require('url');

var handle = {}
handle['/getPhoto'] = getPhoto;
handle['/uploadPhoto'] = uploadPhoto;

function route(request, response){
    var path=url.parse(request.url).pathname;
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
