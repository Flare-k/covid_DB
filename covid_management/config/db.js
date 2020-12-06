/* eslint-disable no-console */
import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();

const mysqlConnection = {
    init : function() {
        return mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PWD,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DB,
            multipleStatements : true   // 다중 쿼리 OK
        });
    },
    connect: function(conn){
        conn.connect(function(error){
            if(error){
                console.log(`🔴 Error on DB Connection: ${error}`);
            }
            else{
                console.log("✅  Connected to MySQL DB");
            }
        });
    },
    close: function(conn){
        conn.end(function (error){
            if (error){
            console.error("🔴 MySQL Terminate Failed.");
            }
            else{
                console.log("✅ DB Terminate Connection.");
            }
        });
    }
};
export default mysqlConnection;