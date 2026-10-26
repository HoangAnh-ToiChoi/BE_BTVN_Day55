require("dotenv").config();

const express = require("express");
const cors = require("cors");

const corsOption = require("./config/cors.config");
const reponse = require("./controllers/response.controller");
const errorHandle = require("./controllers/errrorHandle.controller");
const router = require("./routes");
const notFoundHandleer = require("./controllers/notFoundHandler.controller");
const apiRateLimiter = require("./middlewares/rateLimiter");
require("./config/database.config");

const app = express();

app.use(express.json());

app.use(cors(corsOption));

app.use(reponse);

app.use(apiRateLimiter);

app.use("/api", router);

app.use(notFoundHandleer);

app.use(errorHandle);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
