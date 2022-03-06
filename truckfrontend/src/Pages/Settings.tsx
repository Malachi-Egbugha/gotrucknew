import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import Search from "../Component/Search";
import Layouttwo from "../Layout/Layouttwo";
import { getallwebusers } from '../Api/apicall';
import {useQuery,useQueryClient} from 'react-query';
import Adduser  from '../Component/Adduser';
import Pagination from '../Component/Pagination';
//import Updateuser from '../Component/Updateuser';
//import {updateuser} from "../Api/apicall";
import {Spinner} from 'react-bootstrap';


const Settings = () => {
  
  

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
     
        

          </div>
          
              

      
              
     
    </Layouttwo>
  );
};
export default Settings;
