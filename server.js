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
		tb_query: "SELECT * FROM test_001",
		tb_primary_key: "a",
		tb_name: "test_001"
	} , {
		tb_query: "SELECT * FROM test_002",
		tb_primary_key: "a_002",
		tb_name: "test_002"
	}
];
// 
var calbackAfterGetData = (result, arrQuery) => {
	console.log(arrQuery);
	/*Lấy connection của Mongodb*/
	var dataConfigMongo = mongo_controllers.getStringMongo();
	//
	console.log(23333);
	mongo_controllers.insertOneData(dataConfigMongo.connection, dataConfigMongo.database, 
		arrQuery, result);
}
//
sql_controllers.execSQL(conn, reqConn, arrQuery, calbackAfterGetData)


