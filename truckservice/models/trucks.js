mongoose= require("mongoose");
const Schema = mongoose.Schema;
//create schema
const truckSchema = new Schema(
    {
    platenumber: String,
    brand: String,
    model: String,
    axle: String,
    enginetype: String,
    power: String,
    tonnagecapacity: String,
    specification: String,
    imageurl: String,
    trucknumber: String,
    price: Number,
    status: {
        type: String,
        default: "company",
    },
    taken: {
        type: String,
        default: "0",
    }

    },
    {timestamps: true}

);

//create a model
const Trucks = mongoose.model("truck", truckSchema);
//export the model
module.exports= Trucks;