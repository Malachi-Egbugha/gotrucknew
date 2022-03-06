const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../models/users");
const {mail,fileupload} = require("../services");

//send url with token as parameter to verify email
exports.emailverification = async (req,res) =>{
    try{
       const {email,phone} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({status: false, msg:"User with this email already exit"});
    }
    const token = jwt.sign({email,phone},process.env.KEYGEN,{expiresIn:"1d"});
    const message = `This mail was sent because you subscribe to be a driver in our company.Kindly click on the link to activate your account: ${process.env.EMAIL_URL}/auth/signup/${token}`;
        await mail(email, "Account Activation Link", message);
        res.status(200).json({msg:"Please a verification link was send to the provided mail. Click on the link to verify your account", status: true});
    }
    catch(error){
        console.log(error);
        return res.status(403).json({status: false, msg:"Verification Process was unsuccessful please contact administrator"});

    }
}
exports.getallusers = async (req,res) =>{
    try {
        const users = await User.find();
        const totalUsers = await User.countDocuments();
        res.json({ users, totalUsers,status: true });
      } catch (err) {
        res.json({ msg: "Please Contact Administrator", status: false });
        next(err);
      }


}

exports.updateuser = async(req,res) =>{
    try{
        //console.log(path.resolve());

        //check if passport was uploaded
        if(req.body.password){
            req.body.unhashedpassword= req.body.password;
            //generate a salt
            const salt = await bcrypt.genSalt(10);
            //generate password hash

            const passwordHash = await bcrypt.hash(req.body.password);
            //re-assign hashed version of original password
            req.body.password = passwordHash;
        }
        const {_id} = req.user;
        req.body.status= "confirm";
        const user = await User.findByIdAndUpdate(_id, req.body,{new: true});
        if(!user){
            //return json false response
            return res.status(403).json({status: false, msg: "invalid credentials"});
        }
        if (req.body.password) {
        const { email } = user;
        let message ='';
        if(req.params.status === "change"){
          message = `Your password was changed. \n Your new password is ${req.body.unhashedpassword}`;

        }else{
        
        message = `Your password was reset. \n Your new password is truck. \n Please log in and change your Password`;
        
        }
        await mail(email, "Information Update", message);
      }
      //return json true response
      res.json({ status: true, user });

    }catch(err){
        
    }
}

exports.passportupload =  (req,res)=>{
    let allowedextension = ['.jpg','.png','jpeg'];
   fileupload(req,res,allowedextension,"passport");   
}
exports.guarantorpassportupload = (req,res) =>{
    let allowedextension = ['.jpg','.png','.jpeg'];
   fileupload(req,res,allowedextension,"gurantorpassword"); 

}
exports.updateothersusers =  async (req,res)=>{
  //check if body contains password
  try{
      let {id} = req.params;
      if(req.body.password){
          let {password} = req.body;
          //generate a salt
          const passwordHash = await bcrypt.hash(password,salt);
          //re-assign hashed password to body-password
          req.body.password =  passwordHash;
      }
      const user = await User.findByIdAndUpdate({ _id:id }, req.body);
      if (req.body.password) {
        const { email } = user;
  
        let message = `Your password was reset. \n Your new password is changeMe123!. \n Please log in and change your Password`;
        await mail(email, "Gotruck Profile", message);
      }
      //return json true response
      res.json({ status: true, user });
     

  }
  catch(err){
    console.log(err);
    res.json({msg: "Please Contact Administrator", status: false});

  }
 
}



