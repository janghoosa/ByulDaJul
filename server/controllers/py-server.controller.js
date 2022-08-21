const axios = require("axios");
require('dotenv').config();

exports.getUserInput = async (req, res, next) => {
    let input = req.body;
    axios
        .post(process.env.PY_SERVER_HOST+":"+process.env.PY_SERVER_PORT+"/translate",input)
        .then((results) => {
            // res.send(results.data);
            req.body.data = results.data;
            next();
        })
        .catch((err) => {
            next(err);
        });
};
