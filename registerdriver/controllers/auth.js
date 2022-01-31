const User = require("../models/users");
const Webuser = require("../models/webusers");
const {v4 : uuidv4} = require('uuid');
const {mail} = require("../services");
const path = require('path');
const {sendTokenResponse} = require("../services");

//sign in
exports.signin = async(req,res) =>{
    try{
        //destructure email and password
        const {email, password} = req.body;
   
        //validate email and password
        if(!email || !password){
            return res.status(403).json({status: false,msg:"Please Provide Email and Password"} );
        } 
        //find user
        
        const user = await User.findOne({email});
        //check if user exit
        if(!user){
            return res.status(403).json({msg:"invalid credentials", status:false});
        }

        
        //chek if user is active
        if(user.status === "deactive"){
            return res.status(403).json({msg:"You have been Deactivated", status: false});

        }
        
        //check if password match
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return res.status(403).json({msg: "invalid credential", status: false});
        }
//respond with token
sendTokenResponse(user, 200, res);
    }
    catch(error){
        return res.status(403).json({status: false, msg:"Authentication Server is Down Please Contact administrator"});

    }
}

//signup for urls from emilverification
exports.signup = async (req,res,next) =>{
   
    try{
        //get token from header
        const {email, phone} = req.user;
        const foundUser = await User.findOne({ email });
        if(foundUser){
            return res.sendFile(`${process.cwd()}/public/emailinuse.html`);

        }
        const user = new User({email,phone});
        await user.save();
        const message = `Your account creation on Our Database was successful. \nPlease Login from our mobile application using your email and password. \n Email: ${email} \nPassword: truck \n Please return to the mobile application to continue your registration.\n Login using the credentials below,change your Password and finish the registration process by providing other information via the profile tab. Await confirmation after completing your registration`;
        await mail(email, "Account Registration Confrimation", message);
        //res.status(200).json({user, status: true});
        res.sendFile(`${process.cwd()}/public/signup.html`);

    }catch(err){
        return res.status(403).json({status: false, msg:"Authentication Server is Down Please Contact administrator"});
    }
}

//signup users on web
exports.websignup = async (req,res,next) =>{
   
    try{
        //get token from header
        const {email} = req.body;
        const foundUser = await Webuser.findOne({ email });
        if(foundUser){
            return res.status(403).json({status:false, msg:"User with this email or password already exist"});

        }
        const user = new Webuser(req.body);
        await user.save();
        const message = `Your account creation on Gotruck APP is successful. \n Login Email: ${email} \n Portal Link: https://google.com/ \n Default-Password: truck \n Please Login and change your Password`;
        await mail(email, "Account Registration Confrimation", message);
        res.status(200).json({user, status: true});
        

    }catch(err){
        return res.status(403).json({status: false, msg:"Authentication Server is Down Please Contact administrator"});
    }
}




//sign in
exports.websignin = async(req,res) =>{
    try{
        //destructure email and password
        const {email, password} = req.body;
        //validate email and password
        if(!email || !password){
            return res.status(403).json({status: false,msg:"Please Provide Email and Password"} );
        } 
        //find user
        const user = await Webuser.findOne({email});
        //check if user exit
        if(!user){
            return res.status(403).json({msg:"invalid credentials", status:false});
        }

        
        //chek if user is active
        if(user.status === "deactive"){
            return res.status(403).json({msg:"You have been Deactivated", status: false});

        }
        
        //check if password match
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return res.status(403).json({msg: "invalid credential", status: false});
        }
//respond with token
sendTokenResponse(user, 200, res);
    }
    catch(error){
        return res.status(403).json({status: false, msg:"Authentication Server is Down Please Contact administrator"});

    }
}
//signout
exports.signout = async (req, res, next)=>{
    try{
        res.clearCookie("token");
        res.json({status: true,msg: "Signout success"});

    }catch(err){
        next(err);

    }

};
//web signup driver
exports.driversignup = async (req,res,next) =>{    
    const guarantorpassporturl = req.files.guarantorpassporturl;
    const passporturl = req.files.passporturl;
    const guarantorpassporturlfileName = guarantorpassporturl.name;//get guarantor file name
    const passporturlfileName = passporturl.name;//get passport file name
    const passporturlrenamedurl = uuidv4() + passporturlfileName; // define unique passport url
    const guarantorpassporturlrenamedurl = uuidv4() + guarantorpassporturlfileName; // define unique guarantor passport url
    const guarantorpassportsize = guarantorpassporturl.size/1024;
    //guarantor file size
    const passporturlsize = passporturl.size/1024;
    //passport file size
    const guarantorpassportextension = path.extname(guarantorpassporturlfileName); //  get file extion
    const passportextension = path.extname(passporturlfileName); //  get file extention
  
    //allowed fine extension
    let allowedextension = ['.jpg','.png','.jpeg','.PNG'];
    //if file extension not allowed return error
    if(!allowedextension.includes(guarantorpassportextension) || !allowedextension.includes(passportextension) )
    {
      return res.status(500).json({ msg: "File extension not allowed", status:false });

    }
  
    //check for size (is mut br less than or equal to 240 kilobyte)
    if(guarantorpassportsize > 240 || passporturlsize > 240 ){
        return res.status(500).json({ msg: "File size greater than required", status:false });
      }
      //add image url to req.body
    req.body.passporturl = passporturlrenamedurl;
    req.body.guarantorpassporturl = guarantorpassporturlrenamedurl;
    let passportuploadfile = await guarantorpassporturl.mv(`${process.cwd()}/uploads/${guarantorpassporturlrenamedurl}`);
    let guaratorpassportuploadfile = await passporturl.mv(`${process.cwd()}/uploads/${passporturlrenamedurl}`);
    try{
        const user = new User(req.body);
        let userinfo = await user.save();
        res.status(200).json({userinfo, status: true});
    
    }catch(err){
        return res.status(500).json({ msg: err, status:false });
    }   
   
}

exports.getallwebusers = async (req,res) =>{
    try {
        const webusers = await Webuser.find();
        const totalwebusers = await Webuser.countDocuments();
        res.json({ webusers, totalwebusers,status: true });
      } catch (err) {
        res.json({ msg: "Please Contact Administrator", status: false });
        next(err);
      }


}
