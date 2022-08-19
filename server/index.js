const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.SERVER_PORT || 3003;
app.listen(port, () => {
    console.info(`Server ON PORT=${port}`);
});