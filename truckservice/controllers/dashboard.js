const Truck = require("../models/trucks");
exports.dashboard = async (req, res,) =>{
    //send number of company trucks 
    //
    try{
    const CompanyTruck = await Truck.aggregate([
        {
            $match:{
                status: "company"
            }

        },
        {
          $group: {
            _id: "$status",
            
          },
        },
  
        {
          $sort: { _id: 1 },
        },
        {$count: "total"},
      ]);
      const SalesTruck = await Truck.aggregate([
        {
            $match:{
                status: "sales"
            }

        },
        {
          $group: {
            _id: "$status",
            
          },
        },
  
        {
          $sort: { _id: 1 },
        },
        {$count: "total"},
      ]);
      res.json({
        CompanyTruck,
        SalesTruck,
      });
    }
    catch(err){
        return res
        .status(500)
        .json({ error: "Error  Please Contact Administrator" });
    }
      
}
