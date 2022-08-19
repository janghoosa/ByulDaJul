const User = require("../models/User");
const Views = '../views/'

const data = {
    getUserList: async (req, res, next) => {
        const response = await User.getAllUser().then((results) => {
            console.log(results)
            res.render(Views + 'index.ejs', {users:results});
        })
        // res.send("getUserList")
    }
}

module.exports = {
    data
}