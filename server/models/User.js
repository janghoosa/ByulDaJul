const db = require("../config/db");
const bcrypt = require("bcrypt");

class User {
    static getAllUser = () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT users.user_id, users.nickname FROM users;`
            db.query(query, (err, results) => {
                if (err) reject(err);
                else
                    resolve(results)
            });
        });
    };
}

module.exports = User;