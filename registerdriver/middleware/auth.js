const jwt = require("jsonwebtoken");
const User = require("../models/users");

//Protect routes
exports.verifyemail = async(req,res,next) =>{
    let token;
    
    //check if token is contain in the header
    
    if(req.params.token){
        //extract token
    token = req.params.token;
    }
    
    //check the presence of token
    if(!token){
        
        return res.sendFile(`${process.cwd()}/public/invalid.html`);
    }
    try{
        //Verify token
        const decoded = jwt.verify(token, process.env.KEYGEN);
        req.user = decoded;
        next();

    }
    catch(error){
        return res.sendFile(`${process.cwd()}/public/invalid.html`);

    }
}

//Protect routes
exports.protect = async(req,res,next)=>{
    let token;
    //check if token is contain in the header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //extract token
        token= req.headers.authorization.split(" ")[1];
       
    }
    
    //check the presence of token
    if(!token){
        return res.status(403).json({error: "Unauthorise User", status: false});
    }
    try{
        //verify token
        const decoded = jwt.verify(token, process.env.ADMINKEY);
        req.user= await User.findById(decoded.id);
        next();
    }
    catch(error){
        console.log(error);
        return res.status(403).json({ error: "Unauthorise Users", status: false });

    }
}

exports.apiauthorize = (req, res, next) => {
    let token;
  
    if (req.headers.accesstoken) {
      token = req.headers.accesstoken;
    }
  
    if (!token) {
      return res.status(403).json({ error: "Unauthorise User", status: false });
    } else if (token !== process.env.ACCESSTOKEN) {
      return res.status(403).json({ error: "Wrong Token", status: false });
    }
    next();
  };

