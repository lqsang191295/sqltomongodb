const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

var getStringMongo = (callback) => {
	try {
        var path = "./libs/mongoConnection.json";
        var txt = fs.readFileSync(path, "utf-8");
        var result = Function("return " + txt)();
        var dbConfig;
        dbConfig = result;
        return dbConfig;
    } catch (ex) {
    	console.log(ex);
    }
}

var cnn = (dbConfig, database, callback) => {
	MongoClient.connect(dbConfig, (err, client) => {
		callback(err, client.db(database));
	})
}



var checkExitsData = (db, arrQuery, dataObj, callback) => {

	dataObj.forEach((val) => {
		var where={};
		where[arrQuery["tb_primary_key"]]=val[arrQuery["tb_primary_key"]];
		db.collection(arrQuery["tb_name"]).findOne(where, (err, result) => {
			if(err){
				return;
			}
			if(!result){
				callback(db, arrQuery, val);
			}
		})
	})
}

var insertOneData = (dbConfig, database, arrQuery, dataObj, callback) => {
	cnn(dbConfig, database, (err, db) => {
		if(err) return;
		checkExitsData(db, arrQuery, dataObj, (db, arrQuery, dataObj) => {
			db.collection(arrQuery["tb_name"]).insert(dataObj, function(err, res) {
			    if (err) { 
					console.log(err);
					return;		    	
			    }
		    });
		});
	})
}



module.exports = {
    getStringMongo: getStringMongo,
    insertOneData: insertOneData
}