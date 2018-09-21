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
		tb_query: `
			SELECT A.Application, A.FunctionID, A.FunctionType, A.ParentID, A.Width, 
				A.Level, A.LevelCode, A.DefaultName, B.CustomName
			FROM HCSSYS_FunctionList AS A 
			INNER JOIN HCSSYS_FunctionListLabel AS B 
			ON A.Application = B.Application AND A.FunctionID = B.FunctionID
			WHERE A.Application = 'LMS'
		`,
		tb_primary_key: [
			{"Application": "app"}, 
			{"FunctionID": "function_id"}
		],
		tb_name: "lv.SYS_FunctionList",
		tb_map_filed: [
			{"Application": "app"},
			{"FunctionID": "function_id"},
			{"FunctionType": "type"},
			{"ParentID": "parent_id"},
			{"Width": "width"},
			{"Level": "level"},
			{"LevelCode": "level_code", "type": "array"},
			{"DefaultName": "default_name"},
			{"CustomName": "custom_name"},
		]
	}
];
// 
var calbackAfterGetData = (result, arrQuery) => {
	/*Lấy connection của Mongodb*/
	var dataConfigMongo = mongo_controllers.getStringMongo();
	//
	mongo_controllers.insertOneData(dataConfigMongo.connection, dataConfigMongo.database, 
		arrQuery, result);
}
//
sql_controllers.execSQL(conn, reqConn, arrQuery, calbackAfterGetData)


