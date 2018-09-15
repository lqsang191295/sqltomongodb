const sql_controllers = require('./libs/sql_controller');
const mongo_controllers = require('./libs/mongo_controller');

/* Lấy connection của SQL */
var dataSQL = sql_controllers.getStringSQL();
/* Gán connection */
var conn = dataSQL.conSQL;
var reqConn = dataSQL.reqCon;
/* Async Data from SQL to Mongodb */
var arrQuery = [
	{
		tb_query: "SELECT * FROM TableName",
		tb_primary_key: "Value"
	}
];
// 
var calbackAfterGetData = (err, result, tb_primary_key) => {
	/*Lấy connection của Mongodb*/
	var dataConfigMongo = mongo_controllers.getStringMongo();
	//
	mongo_controllers.insertOneData(dataConfigMongo.connection, dataConfigMongo.database, 
		null, result);
}
sql_controllers.execSQL(conn, reqConn, arrQuery, calbackAfterGetData)


