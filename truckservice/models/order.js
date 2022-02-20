const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref:'truck',
            product_id: String
        }
    ],
    name:String,
    email:String,
    phonenumber:String,
    total_price: Number,
    created_at:{
        type: Date,
        default: Date.now(),
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);

