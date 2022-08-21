var express = require("express");
var router = express.Router();
var userController = require("../controllers/UserController");

router.get("/main", (req, res, next) => {
    res.send("main");
});

router.get("/user", (req, res, next) => {
    userController.data.getUserList(req, res, next);
});

router.get("/user/:user_id", (req, res, next) => {
    userController.data.getUserByID(req, res, next);
});

router.post("/signIn", (req, res, next) => {
    userController.process.signIn(req, res, next);
})

router.post("/signUp", (req, res, next) => {
    userController.process.signUp(req, res, next);
})

router.post("/signOut", (req, res, next) => {
    userController.data.getUserByID(req, res, next);
});

module.exports = router;
