const express = require("express");
const path = require("path");
const cors = require("cors");
const axios =  require('axios');
const fileUpload = require("express-fileupload");
//const morgan = require("morgan");
const mongoose = require("mongoose");


const connectdb = require("./config/db");



const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:path.join(__dirname, 'tmp'),
    createParentPath: true,
}));
app.use('/uploads', express.static('uploads'));
require("dotenv").config();
mongoose.Promise = global.Promise;
connectdb();

//middleware
//app.use(morgan('dev'));

//Body Parser


//routes
app.use("/truck", require("./routes/trucks"));
app.use("/trucksetting", require("./routes/setting"));
app.use("/dashboard", require("./routes/dashboard"));

//app.use("/auth", require("./routes/auth"));

//app.use("/", require("./routes/upload"));

//Start the server
const port = process.env.PORT || 6001;
app.listen(port);
console.log(`Server listening at ${port}`);
