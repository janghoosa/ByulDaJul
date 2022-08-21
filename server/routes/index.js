var express = require("express");
var router = express.Router();
var userController = require("../controllers/user.crtl");
var historyController = require("../controllers/history.ctrl");
var pyServerController = require("../controllers/py-server.ctrl");

router.get("/user", userController.data.getUserList);
router.get("/user/:user_id", userController.data.getUserByID);
router.post("/signIn", userController.process.signIn);
router.post("/signUp", userController.process.signUp);
router.post("/signOut", userController.data.getUserByID);

router.get("/history", historyController.getHistoryById);
router.post("/history", historyController.addHistory);

router.post("/input", pyServerController.getUserInput, historyController.addHistoryMiddleWare);

module.exports = router;
