const express = require("express");
const router = express.Router();

const {dashboard} =  require("../controllers/dashboard");
const {protect,apiauthorize} = require("../middleware/auth");
//mobile

//web routes

router.get("/",protect,dashboard);
module.exports = router;
