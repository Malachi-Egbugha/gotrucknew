let nodemailer = require("nodemailer");
const {v4 : uuidv4} = require('uuid');
const User = require("./models/users");
const path = require("path");
//Get token from model, create cookies and send response
exports.sendTokenResponse= (user, statusCode, res) =>{
    const token = user.getSignedJWToken();
    const options ={
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token",user, token,options).json({status: true, token,user:[user]});
};


exports.mail= async function mail(to,subject,textmessage){
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth:{
            user: "noreply@enugudisco.com",
            pass: "Enugudisco@123",
        },
        secure: true,
    });
    const mailData = {
        from:'"From Truck Service" <noreply@enugudisco.com>',
        to: `${to}`,
        subject: `${subject}`,
        text: `${textmessage}`,
    };
    let info = await transporter.sendMail(mailData, function(err, info){
        if(err) console.log(err);
        else console.log(info);

    });
}



exports.fileupload = async (req,res,allowedextension,uploadtype)=>{
   
    
    if (req.files == null) {
       
        return res.status(400).json({ status:false,msg: "No passport uploaded" });
      }
       
      const file = req.files;
      const fileName = file.name;
      const renamedurl = uuidv4() + file.name;
      const size = file.data.length/1024;
      const extension = path.extname(fileName);
      //define allowed file extension in array
      //let allowedextension = ['.jpg','.png','jpeg'];
      //check for allowed url
      if(!allowedextension.includes(extension))
      {
        return res.status(500).json({ msg: "File extension not allowed", status:false });

      }
      
      //check for size (is mut br less than or equal to 240 kilobyte)
      if(size > 240){
        return res.status(500).json({ msg: "File size greater than required", status:false });
      }
      
     
      try{
          //get id from token
          const {_id} = req.user;
          const checkuser = await passportuser(renamedurl,_id,uploadtype);
          if(!checkuser){
            //return json false response
            return res.status(403).json({status: false, msg: "invalid credentials"});
        }
          //update image url with renamedurl
      let uploadfile = await file.mv(`${process.cwd()}/uploads/${renamedurl}`);
      return res.json({ status: true, checkuser });
      
      }
      catch(err){
        return res.status(500).json({ msg: err, status:false });

      }
      
}


const passportuser = async (renamedurl,_id,type) =>{
   
    try{
        let user;
        if(type === "gurantorpassword")
        {
            user = await User.findByIdAndUpdate(_id, {guarantorpassporturl:renamedurl});

        }
        else{
user = await User.findByIdAndUpdate(_id, {passporturl:renamedurl});
        }

return user;
    }
    catch(err){
        console.log(err);

    }
}

