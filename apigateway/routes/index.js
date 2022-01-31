const express = require("express");
const router = express.Router();
const {allservices,register} = require("../controllers/services");


router.post('/check', allservices);
router.post('/register',register);




module.exports = router;



