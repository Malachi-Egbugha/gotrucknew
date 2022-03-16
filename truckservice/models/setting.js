const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    type:String,
    name:String,
    created_at:{
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("setting", SettingSchema);

