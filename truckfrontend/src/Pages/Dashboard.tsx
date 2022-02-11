import React, { useState, useEffect } from 'react';
import Layouttwo from "../Layout/Layouttwo";



const Dashboard = () => {
  
  return (
    <Layouttwo>
       <div className="main__container">
       
     
       <div className="main__title">
         <img src="assets/banner.jpg" alt="" />
         <div className="main__greeting">
           <h1 className="text-primary-p">DASHBOARD</h1>
      
         </div>
       </div>

       <hr className="main__cards" />
  
       <div className="fourcharts" style={{backgroundColor: "#fff",marginRight: "-10px",padding: "20px"}}>
      
           
           <div className="card1" style={{padding: "20px",color:"#fff", backgroundImage: "linear-gradient(to right, rgb(90, 20, 27), rgb(290, 150, 157))"}}>
           <i className="fa fa-registered" aria-hidden="true"></i>
             <h1 className="text-lightblue" style={{color:"#fff"}}>Number of Registered Drivers</h1>
             <span>1111</span>
           </div>
           <div className="card2"style={{padding: "20px",color:"#fff", backgroundImage: "linear-gradient(to right, rgb(30, 65, 90), rgb(110, 165, 290))"}}>
           <i className="fa fa-truck" aria-hidden="true"></i>
             <h1 className="text-lightblue" style={{color:"#fff"}}>Number of Company Trucks</h1>
             <span>111</span>
           </div>
           <div className="card3" style={{padding: "20px",color:"#fff", backgroundImage: "linear-gradient(to right, rgb(70, 110, 70), rgb(170, 210, 70))"}}>
           <i className="fa fa-shopping-cart" aria-hidden="true"></i>
             <h1 className="text-lightblue" style={{color:"#fff"}}>Number of Sales Truck</h1>
             <span>111</span>
           </div>
           <div className="card4" style={{padding: "20px",color:"#fff", backgroundImage: "linear-gradient(to right, rgb(165, 170, 173), rgb(265, 240, 244))"}}>
           <i className="fa fa-cart-plus" aria-hidden="true"></i>
             <h1 className="text-lightblue" style={{color:"#fff"}}>Number of Pending Orders</h1>
             <span>111</span>
           </div>
           {//users show section
           }
            
         </div>
         </div>

             
    </Layouttwo>
  );
}
export default Dashboard;
