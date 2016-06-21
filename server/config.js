
CONFIG = {
	host:["picocaine.crazyforcode.org","127.0.0.1"],
	port:2333,
	isPublic:false,
	passCode:"lovecfc",
	mongoUrl:"mongodb://localhost:27017/picocaine",
	photo:{
		saveDir:__dirname + "/uploads/",
		// photoCalcSalt:"lovecfc",
		encryptMethod:"md5"
	}
};
module.exports = CONFIG;
