const User = require("../models/User");
const logger = require("../modules/winton");
const Views = '../views/'

const data = {
    getUserList: async (req, res, next) => {
        const response = await User.getAllUser().then((results) => {
            res.render(Views + 'index.ejs', {users:results});
        })
    }
}

module.exports = {
    data
}