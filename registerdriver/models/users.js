mongoose= require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
//create schema
const userSchema = new Schema(
    {
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    address: String,
    dob: String,
    driverlicencenumber: String,
    yearsofexperience: String,
    nextofkinname: String,
    nextofkinaddress: String,
    guarantorname: String,
    guarantoraddress: String,
    guarantorphone: String,
    guarantorpassporturl: String,
    passporturl: String,
    trucknumber: String,
    usertype:{
        type: String,
        default: "driver",

    },
    password:{
        type:String,
        default: "truck"
    },
    status: {
        type: String,
        default: "unconfirm",
    }

    },
    {timestamps: true}

);
userSchema.methods.getSignedJWToken = function (){
    return jwt.sign({id: this._id,usertype: this.usertype},process.env.KEYGEN,{expiresIn:"1d"});
};
userSchema.pre("save", async function(next){
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
userSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword, this.password);

    }
    catch(error){
        console.log(error)
    }

}
//create a model
const Users = mongoose.model("user", userSchema);
//export the model
module.exports= Users;