const express = require("express");
const router = express.Router();
const {emailverification,passportupload,guarantorpassportupload,updateuser,getallusers,updateothersusers} = require("../controllers/users");

const {protect,apiauthorize} = require("../middleware/auth");
//mobile
router.post("/emailverification",emailverification);
router.post("/signup",updateuser);
router.post("/passportupload",passportupload);
router.post("/guarantorpassportupload",guarantorpassportupload);
router.get("/mobilegetallusers",apiauthorize,getallusers);
//web routes
router.put("/updateothersusers/:id(*)",protect,updateothersusers);
router.get("/getallusers",protect,getallusers);
module.exports = router;
