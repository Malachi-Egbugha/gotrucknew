import React,{useState,useEffect} from "react";
import Swal from 'sweetalert2';
import Modal from "react-modal";
import {TRUCK,LOCAL} from "../Api/apiconfig";
import {useQuery,useQueryClient} from 'react-query';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

import {postnewtruck,putupdateusers,driversignup,getavailabletruck,putupdatetruck,putupdatedriver} from "../Api/apicall";
import axios from "axios";
import { type } from "os";
import { idText } from "typescript";

type Props = {
    
    modalIsOpen: any;
    setIsOpen: any;
    infotype: any;
    info:any;
  }
  
const Modalcompoment = ({modalIsOpen,setIsOpen,infotype,info}: Props) =>{  
  const [file, setFile] = useState("");
  const [id, setId] = useState("");
  const [driver, setDriver] = useState({
    firstname: "",
    lastname:"",
    phone:"",
    email:"",
    dob:"",
    address:"",
    driverlicencenumber:"",
    yearsofexperience:"",
    nextofkinname:"",
    nextofkinaddress:"",
    guarantorname:"",
    guarantoraddress:"",
    guarantorphone:"",
    guarantorpassporturl:"",
    passporturl:"",
    trunknumber:"",
  });
  const [values, setValues] = useState({
    year: "",
    brand: "",
    model: "",
    drivingtype: "",
    fueltank:"",
    tire:"",
    bodytype: "",
    color: "",
    enginetype: "",
    tonnage: "",
    wheelbase: "",
    maxspeed: "",
    maxtorque: "",
    clutch: "",
    transmissionmodel: "",
    rearaxle: "",
    steeringtech: "",
    milage: "",
    frame: "",
    price: "",
    status:"",
    truckstatus:"",
 
  });
  useEffect(()=>{
    if(infotype === "edittruck")
  {
    setId(info._id);
    delete info._id;
    delete info.id;
    setValues({...values,...info,truckstatus:info.status});
    
  }
  else if(infotype === "editdriver"){
    
    setId(info._id);
    delete info._id;
    delete info.password;
    delete info.passporturl;
    delete info.guarantorpassporturl;
    setDriver({...driver,...info,trunknumber:info.trucknumber});

  }

  },[info])
  
  

  
  const {
    year,
    brand,
    model,
    drivingtype,
    fueltank,
    tire,
    bodytype,
    color,
    enginetype,
    tonnage,
    wheelbase,
    maxspeed,
    maxtorque,
    clutch,
    transmissionmodel,
    rearaxle,
    steeringtech,
    milage,
    frame,
    price,
    status,
    truckstatus,
    
 

  } = values;

  //destructure driver
  const {
    firstname,
    lastname,
    phone,
    email,
    dob,
    address,
    driverlicencenumber,
    yearsofexperience,
    nextofkinname,
    nextofkinaddress,
    guarantorname,
    guarantoraddress,
    guarantorphone,
    trunknumber,
  } = driver;
  
  //get available trucks
  const {data,isLoading,isError,error} = useQuery('availabletruck', async() => await getavailabletruck(),{refetchInterval: 50000,refetchOnReconnect:false, refetchIntervalInBackground: true, cacheTime: 100000});
  //HANDLEDRIVER CHANGE
  const handleDriverChange =  (name:string) => async (event:React.ChangeEvent<any>) => {
   
    event.target.files ? setDriver({ ...driver,[name]: event.target.files[0] }): setDriver({ ...driver,[name]: event.target.value });
    
    
  };
   //handle change input
   const handleChange =  (name:string) => async (event:React.ChangeEvent<any>) => {
    
    setValues({ ...values,[name]: event.target.value });
   
    

  
  };
  const onFileChange =  (name:string) => async (e:React.ChangeEvent<any>) => {
   
    setFile(e.target.files[0]);

  };
  
 
 
  const customStyles = {
    content: {
    top: '5%',
    left: '20%',
    right: '20%',
    bottom: 'auto',
    boxShadow: '0 0 10px 0 rgba(0,0,97,0.5)',
    overflow: 'auto',
    borderRadius:'4px',
    outline: 'none',
    },
    innerHeight:"50%",

    overlay: {
      backgroundColor: "rgba(0,0,0,0.75)",
     
    }
  };

  
const afterOpenModal = () =>{

}
const closeModal = () =>{
  setValues({   

    year: "",
    brand: "",
    model: "",
    drivingtype: "",
    fueltank:"",
    tire:"",
    bodytype: "",
    color: "",
    enginetype: "",
    tonnage: "",
    wheelbase: "",
    maxspeed: "",
    maxtorque: "",
    clutch: "",
    transmissionmodel: "",
    rearaxle: "",
    steeringtech: "",
    milage: "",
    frame: "",
    truckstatus: "",
    price: "",
    status:"",
  
 });
 setDriver({
  firstname: "",
  lastname:"",
  phone:"",
  email:"",
  dob:"",
  address:"",
  driverlicencenumber:"",
  yearsofexperience:"",
  nextofkinname:"",
  nextofkinaddress:"",
  guarantorname:"",
  guarantoraddress:"",
  guarantorphone:"",
  guarantorpassporturl:"",
  passporturl:"",
  trunknumber:"",
 });
 setId("");
  //clear all state
  setIsOpen(false);

}
const onSubmit =(types:any) => async (e: any) => {

  //driversignup
  e.preventDefault();
 
  
  try {
          if(types === "driver")
          {
                
                const submitdriverdata:any = await driversignup(driver);
                submitdriverdata.status ?  Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
              }) : Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${submitdriverdata.msg}`,
                footer: '<span>Contact Administrator: 070000000</span>'
              });
              
          }
          else if(types === "edittruck"){
         
            
            const putupdatetruckdata:any = await putupdatetruck(id,values);
            putupdatetruckdata.status ?  Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
              }) : Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${putupdatetruckdata.msg}`,
                footer: '<span>Contact Administrator: 070000000</span>'
              });
            
          


          }
          else if(types === "editdriver"){
            console.log(driver);
            const putupdatedriverdata:any = await putupdatedriver(id,driver);
            putupdatedriverdata.status ?  Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
              }) : Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${putupdatedriverdata.msg}`,
                footer: '<span>Contact Administrator: 070000000</span>'
              });
           
            
          }
          else
          {
                  const submitdata:any = await postnewtruck(values,file);
                  submitdata.status ?  Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Success',
                  showConfirmButton: false,
                  timer: 1500
                }) : Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `${submitdata.msg}`,
                  footer: '<span>Contact Administrator: 070000000</span>'
                });;
          
        }
          
        } catch (err) {
          console.log(err);
        }
        
        closeModal();
      }
      const onstatusSubmit = async () =>{
        try{
          let statusupdate = await putupdateusers(info,{status});
          statusupdate.status ?  Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          }) : Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${statusupdate.msg}`,
            footer: '<span>Contact Administrator: 070000000</span>'
          });
          closeModal();

  }
  catch(err){
    console.log(err);

  }
  

}
//set change for diver
const adddriver = () => (
  <div>
  <form className="form-horizontal" >
  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="STEP 1">
  <div className="form-group">
    <div className="row">
      <div className="col">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>FIRSTNAME:</label>
          <div className="input-container">
          <i className="fa fa-user icon" aria-hidden="true"></i>
          <input
          onChange={handleDriverChange("firstname")}
          value={firstname}
          placeholder="ENTER FIRSTNAME"
          type="text"
          className="input-field"
          required
        />
       </div>

      </div>
      <div className="col">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>LASTNAME:</label>
          <div className="input-container">
          <i className="fa fa-user icon" aria-hidden="true"></i>
          <input
          onChange={handleDriverChange("lastname")}
          value={lastname}
          placeholder="ENTER LASTNAME"
          type="text"
          className="input-field"
          required
        />
       
        </div>

      </div>
    </div>
       
        </div>
       
        
        <div className="form-group">
          <div className="row">
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>PHONE NUMBER:</label>
          <div className="input-container">
          <i className="fa fa-phone icon"></i>
          <input
          onChange={handleDriverChange("phone")}
          value={phone}
          placeholder="ENTER PHONE NUMBER"
          type="phone"
          className="input-field"
          required
        />
       
        </div>

            </div>
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter EMAIL:</label>
          <div className="input-container">
          <i className="fa fa-envelope-o icon"></i>
          <input
          onChange={handleDriverChange("email")}
          value={email}
          placeholder="ENTER EMAIL"
          type="email"
          className="input-field"
        />
       
        </div>

            </div>
          </div>
       
        </div>
       
        
        <div className="form-group">
          <div className="row">
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter DATE OF BIRTH:</label>
          <div className="input-container">
          <i className="fa fa-birthday-cake icon"></i>
          <input
          onChange={handleDriverChange("dob")}
          value={dob}
          type="date"
          className="input-field"
        />
       
        </div>

            </div>
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER  ADDRESS:</label>
          <div className="input-container">
          <i className="fa fa-location-arrow icon"></i>
          <textarea value={address} placeholder="ENTER DRIVERS ADDRESS"  onChange={handleDriverChange("address")} className="form-control" id="exampleTextarea" ></textarea>
         
       
        </div>

            </div>
          </div>
        
        </div>
      
        <div className="form-group">
          <div className="row">
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER DRIVER LICENCE NUMBER:</label>
          <div className="input-container">
          <i className="fa fa-id-card-o icon"></i>
          <input
          onChange={handleDriverChange("driverlicencenumber")}
          value={driverlicencenumber}
          placeholder="ENTER DRIVER LICENSE NUMBER"
          type="text"
          className="input-field"
        />
       
        </div>

            </div>
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>YEARS OF EXPERIENCE:</label>
        <div className="input-container">
        <i className="fa fa-book icon"></i>
        
                      <select
                     onChange={handleDriverChange("yearsofexperience")}
                     value={yearsofexperience}
                      className="form-control"
                      required
                      >
                          <option>Please Select</option>
                          <option value="1-5">1-5</option>
                          <option value="6-10">6-10</option>
                          <option value="11-15">11-15</option>
                          <option value="16-20">16-20</option>
                          <option value="21-25">21-25</option>
                          <option value="26-30">26-30</option>
                          <option value="above 30">above 30</option>
                         
                         
                        
                      </select>
                      </div>

            </div>
          </div>
      
        </div>
       
    </Tab>
    {//step 2

    }
    <Tab eventKey="profile" title="STEP 2">
    <div className="form-group">
          <div className="row">
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ASSIGN TRUCK:</label>
        <div className="input-container">
        <i className="fa fa-book icon"></i>
        
                      <select
                     onChange={handleDriverChange("trunknumber")}
                     value={trunknumber}
                      className="form-control"
                      required
                      >
                          <option>Please Select</option>
                          {
                            isLoading ? "" : data.trucks.map((u:any,i:any)=>(
                              <option value={u.platenumber}>{u.brand},{u.model} ({u.platenumber})</option>

                            ))
                          }
                         
                         
                        
                      </select>
                      </div>

            </div>
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER NEXT OF KIN NAME:</label>
          <div className="input-container">
          <i className="fa fa-user-circle icon"></i>
          <input
          onChange={handleDriverChange("nextofkinname")}
          value={nextofkinname}
          placeholder="ENTER NEXT OF KIN NAME"
          type="text"
          className="input-field"
        />
       
        </div>

            </div>
          </div>
       
        </div>
       
        <div className="form-group">
          <div className="row">
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER NEXT OF KIN ADDRESS:</label>
          <div className="input-container">
          <i className="fa fa-map-marker icon"></i>
          <textarea value={nextofkinaddress} placeholder="ENTER NEXT OF KIN ADDRESS"  onChange={handleDriverChange("nextofkinaddress")} className="form-control" id="exampleTextarea" ></textarea>
         
       
        </div>

            </div>
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER GUARANTORS NAME:</label>
          <div className="input-container">
          <i className="fa fa-male icon"></i>
          <input
          onChange={handleDriverChange("guarantorname")}
          value={guarantorname}
          placeholder="ENTER GUARANTORS NAME"
          type="text"
          className="input-field"
        />
       </div>

            </div>
          </div>
       
        </div>
        
       
        
        <div className="form-group">
          <div className="row">
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER GUARANTORS ADDRESS:</label>
          <div className="input-container">
          <i className="fa fa-address-card-o icon"></i>
          <textarea value={guarantoraddress} placeholder="ENTER GUARANTORS ADDRESS"  onChange={handleDriverChange("guarantoraddress")} className="form-control" id="exampleTextarea" ></textarea>
         
       
        </div>

            </div>
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER GUARANTORS PHONE NUMBER:</label>
          <div className="input-container">
          <i className="fa fa-mobile icon"></i>
          <input
          onChange={handleDriverChange("guarantorphone")}
          value={guarantorphone}
          placeholder="ENTER GUARANTORS PHONE"
          type="phone"
          className="input-field"
        />
       </div>

            </div>
          </div>
       
        </div>
       
       
        
        <div className="form-group">
          <div className="row">
            {
              infotype === "editdriver"?<div className="col"></div>:
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>Upload Drivers Passport:</label>
          <div >
          <i className="fa fa-camera icon"></i>
          <input
              onChange={handleDriverChange("passporturl")}
              type="file"
              placeholder="Upload Drivers Passport"
              id="customFile"
            />
           
          
        </div>

            </div>
}
{
  infotype === "editdriver"?<div className="col"></div>:
            <div className="col">
            <label className="text-mute text-primary-p" style={{color: "#000000"}}>Upload Guarantor Passport:</label>
          <div >
          <i className="fa fa-camera icon"></i>
          <input
              onChange={handleDriverChange("guarantorpassporturl")}
              type="file"
              placeholder="Enter Guarantor Passport"
              id="customFile"
            />
           
          
        </div>

            </div>
}
          </div>
       
        </div>
       
        <button onClick={ closeModal} style={{ backgroundColor: '#fe0002'}}  className="btn btn-danger button3">Back</button>
  <button type="submit" onClick={onSubmit(infotype === "editdriver"?"editdriver":"driver")}  style={{backgroundColor: '#008ED3',marginLeft: '10px'}}  
  className="btn btn-danger button3">{infotype === "editdriver"?"Update":"Submit"}</button>
    </Tab>
    </Tabs>
 
       
        </form>
       
    
  </div>

);
const addtruck = () =>
{
  
    //setValues({...values});
 
return (
  <div >
    
<form className="form-horizontal" >
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="STEP 1">
  <div className="form-group">
     <div className="row">
       <div className="col">
       <label className="text-mute text-primary-p" style={{color: "#000000"}}>Year:</label>
       <div className="input-container">
        <i className="fa fa-subway icon"></i>
        <input
        onChange={handleChange("year")}
        value={year}
        placeholder="Enter Year"
        type="text"
        className="input-field"
        required
      />
      
     
      </div>

       </div>
       <div className="col">
       <label className="text-mute text-primary-p" style={{color: "#000000"}}>Brand:</label>
                    <select
                    onChange={handleChange("brand")}
                    value={brand}
                    className="form-control"
                    required
                    >
                        <option>Please Select</option>
                        <option value="benz">BENZ</option>
                        <option value="toyota">TOYOTA</option>
                        <option value="honda">HONDA</option>
                       
                       
                      
                    </select>

       </div>

     </div>
        
      </div>
     
      <div className="form-group">
      <div className="row">
        <div className="col">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Model:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("model")}
        value={model}
        placeholder="Enter Model"
        type="text"
        className="input-field"
        required
      />
     
      </div>

        </div>
        <div className="col">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>Tire:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("tire")}
        value={tire}
        placeholder="Enter Tire"
        type="text"
        className="input-field"
        required
      />
     
      </div>


        </div>
        </div>
      
      </div>
     
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Color:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("color")}
        value={color}
        placeholder="Enter Color"
        type="text"
        className="input-field"
        required
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Wheel Base:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("wheelbase")}
        value={wheelbase}
        placeholder="Enter Wheel Base"
        type="text"
        className="input-field"
        required
      />
     
      </div>

          </div>

        </div>
     
      </div>
     
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Max Speed:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("maxspeed")}
        value={maxspeed}
        placeholder="Enter Max Speed"
        type="number"
        className="input-field"
        required
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Max Torque:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("maxtorque")}
        value={maxtorque}
        placeholder="Enter Max Torque"
        type="number"
        className="input-field"
        required
      />
     
      </div>

          </div>
        </div>
    
      </div>
     
  </Tab>
  {//tab 2
  }
  <Tab eventKey="profile" title="STEP 2">
  
      
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Clutch:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("clutch")}
        value={clutch}
        placeholder="Enter Clutch"
        type="text"
        className="input-field"
        required
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Frame:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("frame")}
        value={frame}
        placeholder="Enter Frame"
        type="text"
        className="input-field"
        required
      />
     
      </div>

          </div>
        </div>
      
      </div>
     
      
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Transmission Model:</label>
        <div className="input-container">
        <i className="fa fa-truck icon"></i>
        <input
        onChange={handleChange("transmissionmodel")}
        value={transmissionmodel}
        placeholder="Enter Transmission Model"
        type="text"
        className="input-field"
        required
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Price:</label>
        <div className="input-container">
        <i className="fa fa-subway icon"></i>
        <input
        onChange={handleChange("price")}
        value={price}
        placeholder="Enter Price"
        type="number"
        className="input-field"
        required
      />
     
      </div>

          </div>
        </div>
     
      </div>
     
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter AXLE:</label>
        <div className="input-container">
        <i className="fa fa-ship icon"></i>
        <input
        onChange={handleChange("rearaxle")}
        value={rearaxle}
        placeholder="Enter Rear/axle"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Engine Type:</label>
                    <select
                   onChange={handleChange("enginetype")}
                   value={enginetype}
                    className="form-control"
                    required
                    >
                        <option>Please Select</option>
                        <option value="v6">V6</option>
                        <option value="v7">V7</option>
                        <option value="v8">V8</option>
                       
                       
                      
                    </select>

          </div>
        </div>
     
      </div>
     
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Driving Type:</label>
        <div className="input-container">
        <i className="fa fa-battery-full icon"></i>
        <input
        onChange={handleChange("drivingtype")}
        value={drivingtype}
        placeholder="Enter Driving Type"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Body Type:</label>
        <div className="input-container">
        <i className="fa fa-battery-full icon"></i>
        <input
        onChange={handleChange("bodytype")}
        value={bodytype}
        placeholder="Enter Body Type"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
        </div>
      
      </div>
  </Tab>
    {//tab 3
  }
  <Tab eventKey="contact" title="STEP 3">
     
      
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Tonnage:</label>
        <div className="input-container">
        <i className="fa fa-plug icon"></i>
        <input
        onChange={handleChange("tonnage")}
        value={tonnage}
        placeholder="Enter Tonnage"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Milage:</label>
        <div className="input-container">
        <i className="fa fa-plug icon"></i>
        <input
        onChange={handleChange("milage")}
        value={milage}
        placeholder="Enter Milage"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
        </div>
     
      </div>
    
      
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Fuel Tank:</label>
        <div className="input-container">
        <i className="fa fa-car icon"></i>
        <input
        onChange={handleChange("fueltank")}
        value={fueltank}
        placeholder="Enter Fuel Tank"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Steering Tech:</label>
        <div className="input-container">
        <i className="fa fa-bus icon"></i>
        <input
        onChange={handleChange("steeringtech")}
        value={steeringtech}
        placeholder="Enter Steering Tech"
        type="text"
        className="input-field"
      />
     
      </div>

          </div>
        </div>
     
      </div>
      
     
      
      <div className="form-group">
        <div className="row">
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Status:</label>
                    <select
                   onChange={handleChange("truckstatus")}
                   value={truckstatus}
                    className="form-control"
                    required
                    >
                        <option>Please Select</option>
                        <option value="company">Company</option>
                        <option value="sale">Sale</option>
                       
                       
                      
                    </select>

          </div>
          {
            infotype === "edittruck"?<div className="col"></div>:
          <div className="col">
          <label className="text-mute text-primary-p" style={{color: "#000000"}}>Upload Picture:</label>
        <div >
        <i className="fa fa-bus icon"></i>
        <input
            onChange={onFileChange("file")}
            type="file"
            placeholder="Enter Truck Number"
            id="customFile"
          />
         
        
      </div>

          </div>
}

        </div>
      
      </div>
      
      <button onClick={ closeModal} style={{ backgroundColor: '#fe0002'}}  className="btn btn-danger button3">Back</button>
<button type="submit" onClick={onSubmit(infotype === "edittruck"?"edittruck":"truck")}  style={{backgroundColor: '#008ED3',marginLeft: '10px'}}  className="btn btn-danger button3">{infotype === "edittruck"?"Update":"Submit"}</button>
    
  </Tab>
</Tabs>

     
      
      
     
      </form>

     
  
</div>
)
}
const pix = () =>(
  
  <div>
    
        <img alt="logo" src={`${TRUCK}/uploads/${info}`} 
        style={{ width: "100%", marginBottom: "1px",marginTop: "1px" }}/>
        <button className="btn btn-danger button3" onClick={closeModal}>close</button>
        </div>
  );
  const driverpix = () =>(
    <div>
     
          <img alt="logo" src={`${LOCAL}/uploads/${info}`} style={{ width: "100%", marginBottom: "1px",marginTop: "1px" }}/>
          <button className="btn btn-danger button3" onClick={closeModal}>close</button>
          </div>
    );
    const details = () =>(
     
      <div className="row">
        <div className="col-sm-4">
        
        <div className="card">
 <img className="card-img-top" src={`${LOCAL}/uploads/${info.guarantorpassporturl}`} alt=""/>
  
</div>
        </div>
        <div className="col-sm-8">
        <div className="row">

        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">GUARANTORS NAME: </span> {info.guarantorname}</span>

        </div>
        
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">GUARANTORS PHONE: </span> {info.guarantorphone}</span>

        </div>
        
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}}><span className="text-lightblue">GUARANTORS ADDRESS: </span> {info.guarantoraddress}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">NEXT OF KIN: </span> {info.nextofkinname}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">ADDRESS NEXT OF KIN: </span> {info.nextofkinaddress}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">ASSIGNED TRUCK: </span> {info.trucknumber}</span>

        </div>
        
        </div>
        
        </div>
       
   
            </div>
            
           
          
           
      );
      const orderdetails = () =>(
        info.map((u:any,i:any)=>(
       
        <div className="row" style={{borderWidth:"1px", borderStyle:"solid"}}>
          
        <div className="col-sm-4">
        
        <div className="card">
 <img className="card-img-top" src={`${TRUCK}/uploads/${u.imageurl}`} alt=""/>
  
</div>
        </div>
        <div className="col-sm-4">
        <div className="row">

        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">TRUCK YEAR: </span> {u.year}</span>

        </div>
        
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">TRUCK BRAND: </span> {u.brand}</span>

        </div>
        
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}}><span className="text-lightblue">TRUCK MODEL: </span> {u.model}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">TRUCK NUMBER: </span> {u.trucknumber}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">ENGINE TYPE: </span> {u.enginetype}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">PRICE: </span> {u.price}</span>

        </div>
        
        </div>
        
        </div>
        {
          //third column
        }
        <div className="col-sm-4">
        <div className="row">

        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">BODY TYPE: </span> {u.bodytype}</span>

        </div>
        
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">FUEL TANK: </span> {u.fueltank}</span>

        </div>
        
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}}><span className="text-lightblue">DRIVING TYPE: </span> {u.drivingtype}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">STEERING TECH: </span> {u.steeringtech}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">ENGINE TYPE: </span> {u.enginetype}</span>

        </div>
        <div className="col-sm-12">
        <span  className="text-title" style={{color: "#000",fontSize: "1.2rem"}} ><span className="text-lightblue">TONNAGE: </span> {u.tonnage}</span>

        </div>
        
        
        </div>
        
        </div>
       
   
            </div>
           
        
        ))
      );
  const addstatusform = () =>(
    
    <form className="form-horizontal" >
     
        <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Status:</label>
                    <select
                   onChange={handleChange("status")}
                   value={status}
                    className="form-control"
                    required
                    >
                        <option>Please Select</option>
                        <option value="verified">Verified</option>
                        <option value="denied">Deny</option>
                       
                       
                       
                      
                    </select>
      </div>

<button onClick={ closeModal} style={{ backgroundColor: '#fe0002'}}  className="btn btn-danger button3">Back</button>
<button type="submit" onClick={onstatusSubmit}  style={{backgroundColor: '#008ED3',marginLeft: '10px'}}  className="btn btn-danger button3">Submit</button>

    </form>

  )
  

const returnfunc = () =>{
  if(infotype === "pix"){
    return pix();

  }
  else if(infotype === "driverpix"){
    return driverpix();
  }
  else if(infotype === "newtruck"){
    return addtruck();

  }
  else if(infotype === "edittruck"){
  
    
    return addtruck();

  }
  else if(infotype === "newdriver"){
    return adddriver();

  }
  else if(infotype === "editdriver"){
    return adddriver();

  }
  else if(infotype === "details"){
    return details();

  }
  else if (infotype === "status"){
    return addstatusform ();

  }
  else if (infotype === "orderdetails"){
    return <div>
      {orderdetails ()}
       <button onClick={ closeModal} style={{ backgroundColor: '#fe0002'}}  className="btn btn-danger button3">Back</button>
    </div>

  }
}
  
   
    Modal.setAppElement("#root");
    return(
        <div>
                <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{maxHeight:"80vh"}}>
        
        {returnfunc()}
        </div>
       
        
        
       
      </Modal>     
        </div>
    )

}

export default Modalcompoment;

