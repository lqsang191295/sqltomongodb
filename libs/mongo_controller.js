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

var checkExitsData = (primary_key, value, callback) => {

}

var insertOneData = (dbConfig, database, collection, dataObj, callback) => {
	cnn(dbConfig, database, (err, db) => {

		db.collection("TableName").insert(dataObj, function(err, res) {
		    if (err) { 
				console.log(err);
				return;		    	
		    }
	    });
	})
}



module.exports = {
    getStringMongo: getStringMongo,
    insertOneData: insertOneData
}