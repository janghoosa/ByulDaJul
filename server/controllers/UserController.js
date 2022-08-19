const User = require("../models/User");

const data = {
    getUserList: async (req, res, next) => {
        const response = await User.getAllUser().then((results) => {
            res.send(results);
        })
        // res.send("getUserList")
    }
}

module.exports = {
    data
}