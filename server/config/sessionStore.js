var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const dotenv = require("dotenv");
dotenv.config();

var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};
var sessionStore = new MySQLStore(options);

module.exports = sessionStore;
