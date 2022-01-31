
  const jwt = require("jsonwebtoken");
  
    
    
    //Protect routes
    exports.protect = async(req,res,next)=>{
        let token;
        console.log(req.headers);
        //check if token is contain in the header
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            //extract token
            token= req.headers.authorization.split(" ")[1];
           
        }
        console.log(token);
        //check the presence of token
        if(!token){
            return res.status(403).json({error: "Unauthorise User", status: false});
        }
        try{
            //verify token
            const decoded = jwt.verify(token, process.env.ADMINKEY);
            console.log(decoded);
            req.user= decoded;
            console.log(req.user);
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
      