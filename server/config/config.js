require('dotenv').config();

const development = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
};

module.exports = development;