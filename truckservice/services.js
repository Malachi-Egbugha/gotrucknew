const amqp = require("amqplib");
const {v4 : uuidv4} = require('uuid');
const path = require("path");
exports.amqpconnect =async () =>{
    //const amqpServer = "amqp://localhost:5672";
    const amqpServer = "amqps://grvuever:rOs1QJQWVSt_azqZWZuzmDQyoHFGyjNO@baboon.rmq.cloudamqp.com/grvuever"
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("TRUCK");
}



//upload truck pix
exports.savepix = (req,res) =>{
    const file = req.files.file;
    const fileName = file.name;
    const renamedurl= uuidv4() + fileName;
    const size = file.data.length/1024;
    const extension = path.extname(fileName);
    let allowedextension = ['.jpg','.png','.jpeg'];
    req.body.imageurl= renamedurl;
   if(!allowedextension.includes(extension))
   {
    res.status(500).json({msg: "File extension not allowed",status:false });
    return "error";

   }
   if(size > 240){
    res.status(500).json({msg: "File size greater than required", status: false});
    return "error";
   }
   file.mv(`${process.cwd()}/uploads/${renamedurl}`,(err)=>{
    if(err){
        res.status(500).json({msg: "Error in uploading file", status: false});
        return "error"
    }
    
});
    
return;
}