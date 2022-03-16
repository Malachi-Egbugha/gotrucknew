const express = require("express");
const router = express.Router();
const {protect,apiauthorize} = require("../middleware/isauthenticated");
const {registertruck,gettruck,buytruck,ordertruck,getavailabletruck,updatetaken,getlimitedtruck,updatetruck,getorders} = require("../controllers/trucks");



router.post("/registertruck",protect,registertruck);
router.get("/gettruck",protect,gettruck);
router.get("/getorders",getorders);
router.get("/getavailabletruck",protect,getavailabletruck);
router.post("/updatetaken/:platenumber",protect,updatetaken);
router.put("/updatetruck/:id",protect,updatetruck);
//mobile
router.post("/mobilebuy",ordertruck);
router.get("/mobilegettruck",apiauthorize,gettruck);
router.get("/mobilegetsixtruck",apiauthorize,getlimitedtruck);



module.exports = router;



