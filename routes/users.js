const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/users/registerUser");
const { getUsers } = require("../controllers/users/getUsers");

router.get("/", getUsers);

// Check if user is registered
router.post("/check", registerUser);

module.exports = router;
