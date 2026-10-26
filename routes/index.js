const express = require("express");
const taskRouter = require("./task.route");
const authRouter = require("./auth.route");

const router = express();

router.use("/tasks", taskRouter);
router.use("/auth", authRouter);

module.exports = router;
