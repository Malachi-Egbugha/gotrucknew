mongoose= require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
//create schema
const webuserSchema = new Schema(
    {
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    usertype:{
        type: String,
        default: "admin",

    },
    password:{
        type:String,
        default: "truck"
    },
    status: {
        type: String,
        default: "active",
    }

    },
    {timestamps: true}

);
webuserSchema.methods.getSignedJWToken = function (){
    return jwt.sign({id: this._id,usertype: this.usertype},process.env.ADMINKEY,{expiresIn:"1d"});
};
webuserSchema.pre("save", async function(next){
    try{
        //GENERATE A SALT
        const salt = await bcrypt.genSalt(10);
        //generate password hash
        const passwordHash = await bcrypt.hash(this.password, salt);
        //re-assign hashed version of original
        this.password = passwordHash;
        next();

    }
    catch(error){
        next(error)
    }
});
webuserSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword, this.password);

    }
    catch(error){
        console.log(error)
    }

}
//create a model
const Webusers = mongoose.model("webuser", webuserSchema);
//export the model
module.exports= Webusers;