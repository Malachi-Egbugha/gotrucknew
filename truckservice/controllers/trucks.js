const Truck = require("../models/trucks");
const Order = require("../models/order");
const {v4 : uuidv4} = require('uuid');
//const {amqpconnect} = require("../services");
const path = require("path");
//amqpconnect();
exports.registertruck = async (req,res)=>{
    try{
        //register truck
        
        const findTruck = await Truck.countDocuments();
        req.body.trucknumber= findTruck + 1;
        console.log(req.body);
       
        
    }catch(err){
      
        return res.status(500).json({ msg: err, status:false });
    }
        
   
      const file = req.files.file;
      const fileName = file.name;//get file name
      const renamedurl = uuidv4() + file.name; // define unique passport url
      const size = file.data.length/1024;// define size of image
      const extension = path.extname(fileName); //  get file extion
      let allowedextension = ['.jpg','.png','.jpeg'];// define allowed fine extension
      //if file extension not allowed return error
      if(!allowedextension.includes(extension))
      {
        return res.status(500).json({ msg: "File extension not allowed", status:false });

      }
      //check for size (is mut br less than or equal to 240 kilobyte)
      if(size > 240){
        return res.status(500).json({ msg: "File size greater than required", status:false });
      }
    //add image url to req.body
      req.body.imageurl = renamedurl;
      //update image url with renamedurl
      let uploadfile = await file.mv(`${process.cwd()}/uploads/${renamedurl}`);

     try{
        const truck = new Truck(req.body);
        let truckinfo = await truck.save();
        res.status(200).json({truckinfo, status: true});
    
    }catch(err){
      console.log(err);
        return res.status(500).json({ msg: err, status:false });
    }

}
//mobile end
exports.gettruck = async (req,res)=>{
  try {
    const trucks = await Truck.find();
    const totaltrucks = await Truck.countDocuments();
    res.json({ trucks, totaltrucks,status: true });
  } catch (err) {
    res.json({ msg: "Please Contact Administrator", status: false });
  }

};
exports.getavailabletruck = async (req,res)=>{
  try {
    const trucks = await Truck.find({taken:"0"});
    const totaltrucks = await Truck.countDocuments();
    res.json({ trucks, totaltrucks,status: true });
  } catch (err) {
    res.json({ msg: "Please Contact Administrator", status: false });
  }

};
exports.buytruck = async (req,res)=>{
  const {ids} = req.body;
  const products = await Truck.find({_id: {$in : ids}});
  //send to message broker queue
  channel.sendToQueue("ORDER", Buffer.from(JSON.stringify({
    products,
    userEmail: req.user.email,

})

));
await channel.consume("TRUCK", data =>{
  order = JSON.parse(data.content);
  channel.ack(data);
});
return res.json(order);
  //submit to message queue
  //send to order services
  
};
exports.updatetaken = async (req,res)=>{
  
  try{
//find record by plate number
const {platenumber} = req.params;
console.log(platenumber)
const doc = await Truck.findOneAndUpdate({platenumber},{taken: "1"});
//adjust taken field to 1
//return 
res.json({doc,status: true});
  }
  catch(err){
    res.json({ msg: "Please Contact Administrator", status: false });

  }
  
}


exports.ordertruck = async (req,res)=>{
  const {ids,email} = req.body;
  const products = await Truck.find({_id: {$in : ids}});
  const newOrder = createOrder(products, email);
  return res.json(newOrder);  
  
}


function createOrder(products, userEmail){
  let total = 0;
  for (let t=0; t<products.length; ++t){
      total += products[t].price;

  }
  const newOrder = new Order({
      products,
      user: userEmail,
      total_price: total

  });
  newOrder.save();
  return newOrder;
}