const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User {
    static getAllUser = () => {
        return new Promise((resolve, reject) => {
            const query =
                `SELECT users.user_id, users.nickname FROM users;`;
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    };

    static getUserById = (user_id) => {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT users.user_id, users.nickname FROM users WHERE user_id=?;";
            db.query(query, [user_id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    };

    static signIn = (user_id) => {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT * FROM users WHERE user_id=?;";
            db.query(query, [user_id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    };
}

module.exports = User;
