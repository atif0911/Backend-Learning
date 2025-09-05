const mysql=require('mysql2');

const pool=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Atif@2003",
    database: "airbnb"
});

module.exports=pool.promise();