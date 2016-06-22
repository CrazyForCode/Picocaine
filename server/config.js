
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
		encryptMethod:"md5",
		compressSmallScale:0.3,
		compressBigScale:0.6,
		savePhotoSize:100
	}
};
module.exports = CONFIG;
