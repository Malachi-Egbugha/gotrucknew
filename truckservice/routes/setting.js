const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/isauthenticated");
const {setsettings,getsettings} = require("../controllers/setting");
//web
router.post("/setsettings",protect,setsettings);
router.get("/getsettings/:type",getsettings);
module.exports = router;



