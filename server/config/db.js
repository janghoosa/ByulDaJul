const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

var pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

pool.getConnection((err, connection) => {
    let createTableUsers = `
        CREATE TABLE IF NOT EXISTS users(
            user_id VARCHAR(20) NOT NULL,
            password VARCHAR(100) NOT NULL,
            nickname VARCHAR(10) NOT NULL,
            PRIMARY KEY(user_id))
    `;
    connection.query(createTableUsers, (err, result) => {
        if (err) throw err; 
    });
})

module.exports = pool;
