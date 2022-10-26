const express = require("express");
const User = require("../controllers/User");

const router = express.Router();

//user routes

router.post("/add-user", User.addUser);

module.exports = router;
