const express = require("express");
const router = express.Router();

const { login, register, updateProfile } = require("../controllers/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/updateProfile").patch(updateProfile);

module.exports = router;
