const db = require("../models");
const logger = require("../modules/winton");
const bcrypt = require("bcrypt");
const Views = "../views/";
const saltRounds = 10;

const data = {
    getUserList: async (req, res, next) => {
        db.user
            .findAll({
                attributes: [
                "id","username","createdAt"
            ]})
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                next(err);
            });
    },
    getUserByID: async (req, res, next) => {
        let user_id = req.params.user_id;
        if (!user_id) {
            res.json({ results: false, message: "No request params" });
            return;
        }
        db.user
            .findOne({
                attributes: ["id", "username"],
                where: { id: user_id },
            })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                next(err);
            });
    },
};

const process = {
    signIn: async (req, res, next) => {
        let id = req.body.user_id;
        let user_pw = req.body.user_pw;
        logger.info(JSON.stringify(req.body));
        if (!id || !user_pw) {
            res.json({ results: false, message: "No request body" });
            return;
        }
        db.user
            .findOne({
                attributes: ["no", "id", "password", "username"],
                where: { id: id },
            })
            .then((results) => {
                if (!results) {
                    res.json({ results: false, message: "No User" });
                    return;
                }
                user = JSON.parse(JSON.stringify(results));
                if (user.id === id) {
                    if (bcrypt.compareSync(user_pw, user.password)) {
                        logger.info("Sign In Success");
                        req.session.user_no = user.no;
                        req.session.user_id = user.id;
                        req.session.isLogined = true;
                        req.session.save((err) => {
                            if (err) next(err);
                            res.json({ results: true, username: user.username });
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
        let encryptPW = bcrypt.hashSync(user_info.user_pw, saltRounds);
        if (user_info == null) {
            res.json({ results: false, message: "No request body" });
            return;
        }
        db.user
            .create({
                id: user_info.user_id,
                password: encryptPW,
                username: user_info.username,
            })
            .then((results) => {
                res.json({ results: true });
            })
            .catch((err) => {
                next(err);
            });
    },
    signOut: async (req, res, next) => {
        console.log(req.session);
        req.session.destory((err) => {
            if (err) next(err);
            req.session = null;
            res.redirect("/");
        });
    },
};

module.exports = {
    data,
    process,
};
