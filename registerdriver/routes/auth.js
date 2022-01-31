const express = require("express");
const router = express.Router();
const {signup,signin,websignup,websignin,signout,driversignup,getallwebusers} = require("../controllers/auth");
const {verifyemail,protect,apiauthorize} = require("../middleware/auth");
//mobile route
router.get("/signup/:token",verifyemail,signup);
router.post("/signin",signin);
//web route
router.post("/signout",signout);
router.post("/websignup",websignup);
router.post("/websignin",websignin);
router.post("/driversignup",protect, driversignup);
router.get("/getallwebusers",protect,getallwebusers);


module.exports = router;
