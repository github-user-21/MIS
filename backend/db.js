const mysql = require("mysql2");
require("dotenv").config();

console.log("Setting up MySQL connection...");

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    connectionLimit: 15,
})

const db = pool.promise();

console.log("MySQL connection pool created.");

function testConnection() {
    console.log("connectivity done")
}

testConnection()

module.exports = db;