const express = require("express");
const app = express();
const router = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
global.logger || (global.logger = require("./modules/winton"));
const morgan = require("./middlewares/morgan.js");
const session = require("express-session");
const sessionStore = require("./config/sessionStore");
dotenv.config();

app.use(morgan);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: "bimkerton",
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/apis", router);

app.use((req, res, next) => {
    res.status(404).send("Sorry, This page is 404!");
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ status: "failed", message: err.message });
});

module.exports = app;
