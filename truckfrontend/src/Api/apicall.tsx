import {LOCAL, TRUCK} from "./apiconfig";
import axios from "axios";
var fs = require('fs');
type Props = {
    email: string;
    password: string;
}
//sigin api
export const signin = async (user: Props) =>{
    const headers = new Headers();
  
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
  
    return fetch(`${LOCAL}/auth/websignin`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user),
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err)=>{
        return {error: 'Server not Avaialable'}

    });
}
//signout
export const signout = async () =>{
  localStorage.removeItem("gotruck");
  try{
    if(typeof window !== "undefined"){
        return await fetch(`${LOCAL}/auth/signout`,{method: "POST"}).then((response)=>{
            console.log("signout", response);

        }).catch((err) => console.log(err));

    }
  }catch(err){
    
  }
};
//get all drivers
export const getalldrivers = async () => {
  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
   headers.append("authorization", `Bearer: ${token}`);
  
    
    try {
      let fetchdrivers = await fetch(`${LOCAL}/user/getallusers`, {
        method: "GET",
        headers: headers,
        
      });
      console.log(fetchdrivers);
      return fetchdrivers.json();
    } catch (err) {
      console.log(err);
    }
  };
  //get all trucks
export const getalltrucks = async () => {
  try {
  
  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
   headers.append("authorization", `Bearer: ${token}`);
   //console.log('heres');
    
    
      
      let fetchtrucks = await fetch(`${TRUCK}/truck/gettruck`, {
        method: "GET",
        headers: headers,
        
      });
   
     
      return fetchtrucks.json();
    } catch (err) {
      console.log(err);
    }
   
  };

  export const postnewtruck = async (truckinfo:any,file:any) =>{
    const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
let data = new FormData();
data.append('platenumber', truckinfo.platenumber);
data.append('brand', truckinfo.brand);
data.append('model', truckinfo.model);
data.append('axle', truckinfo.axle);
data.append('enginetype', truckinfo.enginetype);
data.append('power', truckinfo.power);
data.append('tonnagecapacity', truckinfo.tonnagecapacity);
data.append('specification', truckinfo.specification);
data.append('trucknumber', truckinfo.trucknumber);
data.append('status', truckinfo.status);
data.append('price',truckinfo.price);
data.append('file', file);

var config:any = {
  method: 'post',
  url: `${TRUCK}/truck/registertruck`,
  headers: { 
   
    "Content-Type": "multipart/form-data",
    'authorization': `Bearer: ${token} `, 
    
  },
  data : data
};

try {
  let posttrucks = await axios(config);
  console.log(posttrucks.data);
  return posttrucks.data;
} catch (err) {
  console.log(err);
}


  

};

export const putupdateusers = async (id: any,data: any) => {
  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("authorization", `Bearer: ${token}`);

  
  try {
    let putupdates = await fetch(`${LOCAL}/user/updateothersusers/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
      
    });
    return putupdates.json();
  } catch (err) {
      return {error: 'Server not Avaialable'}
  }
  
};

export const driversignup = async (driverinfo:any) =>{
  console.log(driverinfo.trucknumber);
  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
let data = new FormData();
data.append('firstname', driverinfo.firstname);
data.append('lastname', driverinfo.lastname);
data.append('phone', driverinfo.phone);
data.append('email', driverinfo.email);
data.append('address', driverinfo.address);
data.append('dob', driverinfo.dob);
data.append('driverlicencenumber', driverinfo.driverlicencenumber);
data.append('yearsofexperience', driverinfo.yearsofexperience);
data.append('trucknumber', driverinfo.trunknumber);
data.append('nextofkinname', driverinfo.nextofkinname);
data.append('nextofkinaddress', driverinfo.nextofkinaddress);
data.append('guarantorname', driverinfo.guarantorname);
data.append('guarantoraddress', driverinfo.guarantoraddress);
data.append('guarantorphone', driverinfo.guarantorphone);
data.append('guarantorpassporturl', driverinfo.guarantorpassporturl);
data.append('passporturl', driverinfo.passporturl);

var config:any = {
  method: 'post',
url: `${LOCAL}/auth/driversignup`,
headers: { 
 
  "Content-Type": "multipart/form-data",
  'authorization': `Bearer: ${token} `, 
  
},
data : data
};

try {
let postdriver = await axios(config);
return postdriver.data;
} catch (err) {
console.log(err);
}

};

export const postwebusers = async (data: any) => {
  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("authorization", `Bearer: ${token}`);

  
  try {
    let postweb = await fetch(`${LOCAL}/auth/websignup`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      
    });
    return postweb.json();
  } catch (err) {
      return {error: 'Server not Avaialable'}
  }
  
};



//get all web users
export const getallwebusers = async () => {

  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
   headers.append("authorization", `Bearer: ${token}`);
  
    
    try {
      let fetchallwebusers = await fetch(`${LOCAL}/auth/getallwebusers`, {
        method: "GET",
        headers: headers,
        
      });
     
      return fetchallwebusers.json();
    } catch (err) {
      console.log(err);
    }
  };

 //get all trucks
export const getavailabletruck = async () => {
  try {
  
  const token = JSON.parse(localStorage.getItem("gotruck") || '{}');
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("authorization", `Bearer: ${token}`);
   //console.log('heres');
    
    
      
      let fetchavailabletrucks = await fetch(`${TRUCK}/truck/getavailabletruck`, {
        method: "GET",
        headers: headers,
        
      });
      return fetchavailabletrucks.json();
    } catch (err) {
      console.log(err);
    }
   
  };



  