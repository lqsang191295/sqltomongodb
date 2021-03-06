const sql = require('mssql');
const fs = require('fs');
const str_sql = "";
var conSQL, reqCon;
const logs = require('./logs');

var getStringSQL = (callback) => {
	try {
        var path = "./libs/sqlConnection.json";
        var txt = fs.readFileSync(path, "utf-8");
        var result = Function("return " + txt)();
        var dbConfig = {
            server: null,
            database: null,
            user: null,
            password: null,
            port: null
        }
        dbConfig.server = result.server;
        dbConfig.database = result.database;
        dbConfig.user = result.user;
        dbConfig.password = result.password;
        dbConfig.port = result.port;
        return getConectionSql(dbConfig, callback);
    } catch (ex) {
    	console.log(ex);
    }
}

var getConectionSql = (dbConfig, callback) => {
    var conn = new sql.ConnectionPool(dbConfig);
    var reqConnection = new sql.Request(conn);
    this.conSQL = conn;
    this.reqCon = reqConnection;
    return this;
}

var execSQL = (conn, reqCon, arrQuery, callback) => {
    conn.connect(function (err) {
        if(err) {
            return;
        };

        function run(qr, callback){
            reqCon.query(qr["tb_query"], (err, recordset) => {
                if(callback) {
                    callback(recordset.recordset, qr);
                }
            });
        }

        for(var i = 0; i < arrQuery.length; i++){
            var qr = arrQuery[i];
            new run(qr, callback);
        }      
    })
}

module.exports = {
    getStringSQL: getStringSQL,
    execSQL: execSQL
}