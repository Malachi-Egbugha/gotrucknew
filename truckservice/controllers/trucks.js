const Truck = require("../models/trucks");
const Order = require("../models/order");
const {v4 : uuidv4} = require('uuid');
const {savepix} = require("../services");
const fs = require("fs");
//const {amqpconnect} = require("../services");
const path = require("path");
//amqpconnect();
exports.registertruck = async (req,res)=>{
    try{
        //register truck
        const findTruck = await Truck.countDocuments();
        req.body.trucknumber= findTruck + 1;
    }catch(err){
        return res.status(500).json({ msg: err, status:false });
    }
  let uploadfile = await savepix(req,res);
  if(uploadfile === "error"){
    return;
  }

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
    res.json({ trucks,totaltrucks,status: true });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Please Contact Administrator", status: false });
  }

};
exports.getlimitedtruck = async (req,res)=>{
  try {
    const trucks = await Truck.find().sort({createdAt: -1}).limit(6);
    res.json({ trucks,status: true });
  } catch (err) {
    console.log(err);
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
exports.updatetruck = async (req,res) =>{
  try{
    const {id,truckparam} = req.params;
    if(truckparam == "truckimage")
    {
      let uploadfile = await savepix(req,res);
      if(uploadfile === "error"){
        return;
      }
      
    }
    const doc =  await Truck.findByIdAndUpdate({_id:id}, req.body);
    truckparam == "truckimage"? fs.unlinkSync(`${process.cwd()}/uploads/${doc.imageurl}`):"";
    res.json({doc,status: true});

  }
  catch(err){
    res.json({ msg: "Please Contact Administrator", status: false });

  }
}
exports.updatetaken = async (req,res)=>{
  
  try{
//find record by plate number
const {platenumber} = req.params;
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
  const {ids,email,name,phonenumber} = req.body;
  //loop through the ids array
   let products = [];
   for (let t=0; t<ids.length; ++t){
    const product = await Truck.findOne({_id: ids[t]});
    products.push(product);

}
  //const products = await Truck.find({_id: {$in : ids}});
  const newOrder = createOrder(products, email,name,phonenumber);
  return res.json(newOrder);  
  
}
exports.getorders = async (req,res) =>{
  //find all in orders
  
  try {
    const orders = await Order.find();
    const totalorders = await Order.countDocuments();
    res.json({ orders, totalorders,status: true });
  } catch (err) {
    res.json({ msg: "Please Contact Administrator", status: false });
  }
}

function createOrder(products, userEmail,userName,userPhonenumber){
  let total = 0;
  //let productid = [];
  for (let t=0; t<products.length; ++t){
      total += products[t].price;
     // productid.push(products[t]._id );

  }
  const newOrder = new Order({
      products,
      email: userEmail,
      name:userName,
      phonenumber:userPhonenumber,
      total_price: total

  });
  newOrder.save();
  return newOrder;
}