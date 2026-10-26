const express = require("express");
const router = express();

const taskController = require("../controllers/task.controller");
const authRequried = require("../controllers/authRequire");

router.get("/", authRequried, taskController.getAll);

router.post("/", authRequried, taskController.create);

router.get("/:id", authRequried, taskController.getOne);

router.delete("/:id", authRequried, taskController.delTask);

router.patch("/:id", authRequried, taskController.updateTask);

module.exports = router;
