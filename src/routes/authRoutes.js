const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  verifyEmail,
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.get("/users", getUsers);

router.get("/verify-email", verifyEmail);

module.exports = router;