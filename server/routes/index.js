var express = require("express");
var router = express.Router();
var userController = require("../controllers/User.controller");

router.get("/user", userController.data.getUserList);

router.get("/user/:user_id", userController.data.getUserByID);

router.post("/signIn", userController.process.signIn);

router.post("/signUp", userController.process.signUp);

router.post("/signOut", userController.data.getUserByID);

module.exports = router;
