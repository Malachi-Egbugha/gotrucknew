import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import Search from "../Component/Search";
import Addsettings from "../Component/Addsetting";
import Getsettings from "../Component/Getsetting";
import Layouttwo from "../Layout/Layouttwo";
;



const Settings = () => {
  const [submitstatus, setsubmitstatus] = useState('false');

  const setSubmitstatus = () =>{
    window.location.reload();
  }
  
  return (
    <Layouttwo>
      <div className="main__container">
     
      
        <div className="main__title">
          <img src="assets/banner.jpg" alt="" />
          <div className="main__greeting">
            <h1 className="text-primary-p">Settings</h1>
       
          </div>
        </div>

        <hr className="main__cards" />
        <div className="maincontentone"  style={{padding: "30px",background: "#ffffff",fontSize: "1rem"}}>
        <div className="row" style={{paddingBottom: "20px"}}>
      <div className="col-6">
        <div className='row'>
      {<Addsettings named="Add Model" placeholder="Enter Model" typeset="model" setSubmitstatus={setSubmitstatus}/>}
    {<Getsettings gettype='model' />}
        </div>
        </div>
        <div className="col-6">
        <div className='row'>
        {<Addsettings named="Add Brand" placeholder="Enter Brand" typeset="brand" setSubmitstatus={setSubmitstatus}/>}
    {<Getsettings gettype='brand' />}
    </div>
        </div>
        </div>
        {
          //second row
        }
         <div className="row"  style={{borderTopWidth: '1px', borderTopStyle:'solid', paddingTop:"20px"}}>
      <div className="col-6">
        <div className='row'>
      {<Addsettings named="Add Year" placeholder="Enter Year" typeset="year" setSubmitstatus={setSubmitstatus}/>}
    {<Getsettings gettype='year' />}
        </div>
        </div>
        <div className="col-6">
        <div className='row'>
        {<Addsettings named="Engine Type" placeholder="Enter Engine Type" typeset="enginetype" setSubmitstatus={setSubmitstatus}/>}
    {<Getsettings gettype='enginetype' />}
    </div>
        </div>
        </div>
          </div>
      
        
     
        

          </div>
          
              

         
              
     
    </Layouttwo>
  );
};
export default Settings;
