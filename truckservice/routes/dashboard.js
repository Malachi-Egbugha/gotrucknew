const express = require("express");
const router = express.Router();
const {protect,apiauthorize} = require("../middleware/isauthenticated");
const {dashboard} = require("../controllers/dashboard");



router.get("/",protect, dashboard);




module.exports = router;



