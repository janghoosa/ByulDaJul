const db = require("../models");
const logger = require("../modules/winton");

exports.getHistoryById = async (req, res, next) => {
    if (!req.session.isLogined) {
        res.status(401).send("Please Login First!");
        return;
    }
    db.history
        .findAll({ where: { user_no: req.session.user_no } })
        .then((results) => {
            if (!results) {
                res.json({ results: false, message: "No Data" });
                return;
            }
            res.send(results);
        })
};

exports.addHistory = async (req, res, next) => {
    if (!req.session.isLogined) {
        res.status(401).send("Please Login First!");
        return;
    }
    console.log(req.body)
    db.history
        .create({
            input: req.body.input,
            output: req.body.output,
            user_no: req.session.user_no
        })
        .then((results) => {
            res.json({ results: true });
        })
        .catch((err) => {
            next(err);
        });
};