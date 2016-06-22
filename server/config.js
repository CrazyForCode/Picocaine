
CONFIG = {
	protocol:'http',
	host:"picocaine.crazyforcode.org",
	port:2333,
	isPublic:false,
	passCode:"lovecfc",
	mongoUrl:"mongodb://localhost:27017/picocaine",
	photo:{
		saveDir:__dirname + "/uploads",
		// photoCalcSalt:"lovecfc",
		encryptMethod:"md5"
	}
};
module.exports = CONFIG;
