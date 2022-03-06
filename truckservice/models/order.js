const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
       
    ],
    name:String,
    email:String,
    phonenumber:String,
    total_price: Number,
    status:{
        type: String,
        default:"pending"

    },
    created_at:{
        type: Date,
        default: Date.now(),
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);

