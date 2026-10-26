const express = require("express");
const authController = require("../controllers/auth.controller");
const authRequire = require("../controllers/authRequire");

const router = express();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authRequire, authController.logout);

module.exports = router;
