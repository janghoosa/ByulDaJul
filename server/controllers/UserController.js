const User = require("../models/User");
const logger = require("../modules/winton");
const bcrypt = require("bcrypt");
const Views = "../views/";
const saltRounds = 10;

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
};

const process = {
    signIn: async (req, res, next) => {
        let user_id = req.body.user_id;
        let user_pw = req.body.user_pw;
        logger.info(JSON.stringify(req.body));
        if (user_id == null || user_pw == null) {
            res.json({ results: false, message: "No request body" });
            return;
        }
        const response = await User.signIn(user_id)
            .then((results) => {
                if (results.user_id === user_id) {
                    if (bcrypt.compareSync(user_pw, results.password)) {
                        logger.info("Sign In Success");
                        req.session.user_id = results.user_id;
                        req.session.isLogined = true;
                        req.session.save(err => {
                            if (err) next(err);
                            res.json({ results: true });
                        });
                    } else {
                        logger.error("pw not equal");
                        res.json({ results: false });
                    }
                } else {
                    logger.error("id not equal");
                    res.json({ results: false });
                }
            })
            .catch((err) => {
                next(err);
            });
    },
    signUp: async (req, res, next) => {
        let user_info = req.body;
        logger.info(JSON.stringify(req.body));
        let ecryptPW = bcrypt.hashSync(user_info.user_pw, saltRounds);
        Object.assign(user_info, { ecryptPW: ecryptPW });
        if (user_info == null) {
            res.json({ results: false, message: "No request body" });
            return;
        }
        const response = await User.signUp(user_info)
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                next(err);
            });
    },
};

module.exports = {
    data,
    process,
};
