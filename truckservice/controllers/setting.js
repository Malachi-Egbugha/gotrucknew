const Setting = require("../models/setting");
exports.setsettings = async (req,res) =>{
    try{
        const setting = new Setting(req.body);
        await setting.save();
        res.status(200).json({setting, status: true});

    }catch(err){
        return res.status(403).json({error:"Error Please contact administrator",status:false});
    }
}

exports.getsettings = async (req,res) =>{
    try {
        const {type} = req.params;
        const setsettings = await Setting.find({type}).sort({createdAt: -1});
        res.json({ setsettings,status: true });
      } catch (err) {
        console.log(err);
        res.json({ msg: "Please Contact Administrator", status: false });
      }

}
