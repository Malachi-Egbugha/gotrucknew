const express = require("express");
//const morgan = require("morgan");
const mongoose = require("mongoose");
let nodemailer = require("nodemailer");
const {amqpconnect} = require("./services");
const connectdb = require("./config/db");
var path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();
mongoose.Promise = global.Promise;
connectdb();
const Order = require("./models/order");


//middleware
//app.use(morgan('dev'));
app.use(cors());
//Body Parser
app.use(express.json());
function createOrder(products, userEmail){
    let total = 0;
    for (let t=0; t<products.length; ++t){
        total += products[t].price;

    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total

    });
    console.log(newOrder);
    newOrder.save();
    return newOrder;
}
amqpconnect().then(()=>{
    channel.consume("ORDER", data=>{
        const {products, userEmail} = JSON.parse(data.content);
        const newOrder = createOrder(products, userEmail);
        channel.ack(data);
        channel.sendToQueue("TRUCK", Buffer.from(JSON.stringify({newOrder})));
    });
});

//routes
//app.use("/user", require("./routes/users"));


//app.use("/", require("./routes/upload"));

//Start the server
const port = process.env.PORT || 5060;
app.listen(port);
console.log(`Server listening at ${port}`);
