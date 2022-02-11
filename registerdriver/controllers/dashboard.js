const User = require("../models/users");
exports.dashboard = async (req,res) =>{
    try{
    const totalUser = await User.countDocuments();
    res.json({totalUser});
    res.json({ ourPerformance, totalPerformance });
    
    }
    catch(err){
        console.log(err);
        return res.status(403).json({status: false, msg:"Error Please Contact Administrator"});

    }

}