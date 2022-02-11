mongoose= require("mongoose");
const Schema = mongoose.Schema;
//create schema
const truckSchema = new Schema(
    {
    year: String,
    brand: String,
    model: String,
    drivingtype: String,
    fueltank:String,
    tire:String,
    bodytype: String,
    color: String,
    enginetype: String,
    tonnage: String,
    wheelbase: String,
    maxspeed: String,
    maxtorque: String,
    clutch: String,
    transmissionmodel: String,
    rearaxle: String,
    steeringtech: String,
    milage: String,
    frame: String,
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