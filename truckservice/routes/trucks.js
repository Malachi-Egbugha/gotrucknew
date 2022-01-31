const express = require("express");
const router = express.Router();
const {protect,apiauthorize} = require("../middleware/isauthenticated");
const {registertruck,gettruck,buytruck,ordertruck,getavailabletruck,updatetaken} = require("../controllers/trucks");



router.post("/registertruck",protect,registertruck);
router.get("/gettruck",protect,gettruck);
router.get("/getavailabletruck",protect,getavailabletruck);
router.post("/updatetaken/:platenumber",protect,updatetaken);
//mobile
router.post("/mobilebuy",ordertruck);
router.get("/mobilegettruck",apiauthorize,gettruck);



module.exports = router;



