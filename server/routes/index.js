var express = require("express");
var router = express.Router();

router.get("/main", (req, res, next) => {
    res.send("main")
})

module.exports = router;