const app = require("./app")

const port = process.env.SERVER_PORT || 3003;
app.listen(port, () => {
    logger.info(`Server ON PORT=${port}`);
});