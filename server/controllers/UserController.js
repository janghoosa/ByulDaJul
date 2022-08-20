const User = require("../models/User");
const logger = require("../modules/winton");
const Views = "../views/";

const data = {
    getUserList: async (req, res, next) => {
        const response = await User.getAllUser()
            .then((results) => {
                // res.render(Views + 'index.ejs', {users:results});
                res.send(results);
            })
            .catch((err) => {
                next(err);
            });
    },
    getUserByID: async (req, res, next) => {
        let user_id = req.params.user_id;
        // logger.info(JSON.stringify(req.query))
        const response = await User.getUserById(user_id)
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                next(err);
            });
    },
    signIn: async (req, res, next) => {
        let user_id = req.body.user_id;
        let user_pw = req.body.user_pw;
        if (user_id == null || user_pw == null) {
            res.send("No request body");
            next();
        }
        const response = await User.signIn(user_id)
            .then((results) => {
                if (results.user_id === user_id) {
                    if (results.password === user_pw) {
                        logger.info("Sign In Success")
                        res.json({results:true})
                    }
                    else {
                        logger.error("pw not equal")
                        res.json({results:false})
                    }
                }
                else {
                    logger.error("id not equal")
                    res.json({results:false})
                }
            })
            .catch((err) => {
                next(err);
            })
    }
};

module.exports = {
    data,
};
