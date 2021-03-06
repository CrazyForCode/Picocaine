var MongoClient = require('mongodb').MongoClient;
var CONFIG = require('../config');
var dbconn;
// Connect using MongoClient
MongoClient.connect(CONFIG.mongoUrl, function(err, db) {
  // Get an additional db
    dbconn = db;
});

function isPhotoHashExists(hash, callback){
    var db = dbconn.collection('photo');
    // db.save({_id:1, hash:'d39b1bb7d0edfc85397f81765e84f292'});
    // console.log(db);
    db.find({hash:hash}).toArray(function(err, doc){
        // console.log(doc.length !== 0);
        callback(doc.length !== 0);
    });
}

function savePhoto(hash, type, tags){
    var db = dbconn.collection('photo');
    db.save({
        hash:hash,
        time:new Date(),
        type:type,
        tags:tags
    });
}

function searchPhotoByTags(tag, page, pageSize, callback){
    pageSize = pageSize>100?100:pageSize;
    var db = dbconn.collection('photo');
    var r = new RegExp('.*'+tag+'*');
    db.find({
        tags:{$in:[r]}
    }).skip(page * pageSize).limit(pageSize).toArray(function(err, doc){
        callback(doc);
    });
}


function addSearchHistory(tag){
    var db = dbconn.collection('sc_history');
    // console.log(db);
    db.findAndModify(
        {tag:tag},
        [],
        {$inc:{times:1}, $set:{updateTime:new Date()}},
        { upsert: true, new: true },
        function(err, doc){
            if(!doc){
                //Need insert
                db.insert({
                    tag: tag,
                     times: 1,
                     updateTime:new Date()
                });
            }
        });
}

function findHotTags(size, callback){
    var db = dbconn.collection('sc_history');
    db.find().sort({times:-1}).limit(size>100?100:size).toArray(function(err,doc){
        callback(doc);
    })
}

// // Category
// {
//     "_id":"asdasda",
//     "category_name":"Robbit"
// }
// // photo
// {
//     "name":"xxx.jpg",
//     "hash":"123541231231241233abcdef",
//     ""
// }

exports.isPhotoHashExists = isPhotoHashExists;
exports.savePhoto = savePhoto;
exports.searchPhotoByTags = searchPhotoByTags;
exports.addSearchHistory = addSearchHistory;
exports.findHotTags = findHotTags;
