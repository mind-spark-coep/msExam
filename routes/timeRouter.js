const express = require("express");
const router = express.Router();
const { getRemainingTime } = require("../controllers/time/getRemainingTime");

router.get("/remaining",getRemainingTime);

module.exports = router;
