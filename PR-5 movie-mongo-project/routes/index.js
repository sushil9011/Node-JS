const express = require("express");
const router = express.Router();

router.use("/", require("./movie.route"));

module.exports = router;
