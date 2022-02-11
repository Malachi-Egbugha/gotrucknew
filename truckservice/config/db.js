const mongoose = require("mongoose");
const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);

    }catch(err){
        console.log(err);
    }
};
//mongodb://localhost/drivers
//mongodb+srv://gotruck:m0645032@cluster0.8g5es.mongodb.net/gotrucktrucks?retryWrites=true&w=majority
module.exports = connectDb;

//DATABASE=mongodb://mongo_db:27017/trucks
//mongodb://mongo_db:27017/trucks