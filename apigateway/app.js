const express = require("express");
const path = require("path");
const cors = require("cors");
const axios =  require('axios');
var bodyParser = require('body-parser');

//const morgan = require("morgan");







const app = express();
app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require("dotenv").config();





//routes
app.use("/good", require("./routes/index"));



//Start the server
const port = process.env.PORT || 6001;
app.listen(port);
console.log(`Server listening at ${port}`);


