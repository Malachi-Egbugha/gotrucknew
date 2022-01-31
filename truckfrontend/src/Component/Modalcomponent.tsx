import React,{useState} from "react";
import Swal from 'sweetalert2';
import Modal from "react-modal";
import {TRUCK,LOCAL} from "../Api/apiconfig";
import {useQuery,useQueryClient} from 'react-query';

import {postnewtruck,putupdateusers,driversignup,getavailabletruck} from "../Api/apicall";
import axios from "axios";
import { type } from "os";



type Props = {
    
    modalIsOpen: any;
    setIsOpen: any;
    infotype: any;
    info:any;
  }
  
const Modalcompoment = ({modalIsOpen,setIsOpen,infotype,info}: Props) =>{
 
  const [file, setFile] = useState("");
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
    platenumber: "",
    brand: "",
    model: "",
    axle: "",
    enginetype: "",
    power: "",
    tonnagecapacity: "",
    specification: "",
    trucknumber: "",
    status: "",
    price:"",
 
  });
  const {
    platenumber,
    brand,
    model,
    axle,
    enginetype,
    power,
    tonnagecapacity,
    specification,
    trucknumber,
    status,
    price,
    
 

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
    console.log(driver);
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
    top: '8%',
    left: '32%',
    right: '32%',
    bottom: 'auto',
    boxShadow: '0 0 10px 0 rgba(0,0,97,0.5)',
    overflow: 'auto',
    borderRadius:'4px',
    outline: 'none',
    },

    overlay: {
      backgroundColor: "rgba(0,0,0,0.75)",
     
    }
  };

  
const afterOpenModal = () =>{

}
const closeModal = () =>{
  setValues({   
  platenumber: "",
  brand: "",
  model: "",
  axle: "",
  enginetype: "",
  power: "",
  tonnagecapacity: "",
  specification: "",
  trucknumber: "",
  status: "",
  price:"",
  
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
 })
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
  <div style={{overflow: "auto", height:"600px"}}>
  <form className="form-horizontal" >
  <div className="form-group">
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
        <div className="form-group">
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
        
        <div className="form-group">
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
        <div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter EMAIl:</label>
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
        
        <div className="form-group">
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
        <div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER  ADDRESS:</label>
          <div className="input-container">
          <i className="fa fa-location-arrow icon"></i>
          <textarea value={address} placeholder="ENTER DRIVERS ADDRESS"  onChange={handleDriverChange("address")} className="form-control" id="exampleTextarea" ></textarea>
         
       
        </div>
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER NEXT OF KIN ADDRESS:</label>
          <div className="input-container">
          <i className="fa fa-map-marker icon"></i>
          <textarea value={nextofkinaddress} placeholder="ENTER NEXT OF KIN ADDRESS"  onChange={handleDriverChange("nextofkinaddress")} className="form-control" id="exampleTextarea" ></textarea>
         
       
        </div>
        </div>
        
        <div className="form-group">
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
        
        <div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>ENTER GUARANTORS ADDRESS:</label>
          <div className="input-container">
          <i className="fa fa-address-card-o icon"></i>
          <textarea value={guarantoraddress} placeholder="ENTER GUARANTORS ADDRESS"  onChange={handleDriverChange("guarantoraddress")} className="form-control" id="exampleTextarea" ></textarea>
         
       
        </div>
        </div>
       
        <div className="form-group">
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
        
        <div className="form-group">
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
        <div className="form-group">
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
        <button onClick={ closeModal} style={{ backgroundColor: '#fe0002'}}  className="btn btn-danger button3">Back</button>
  <button type="submit" onClick={onSubmit("driver")}  style={{backgroundColor: '#008ED3',marginLeft: '10px'}}  className="btn btn-danger button3">Submit</button>
        </form>
       
    
  </div>

);
const addtruck = () =>(
  <div style={{overflow: "auto", height:"600px"}}>
<form className="form-horizontal" >
<div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Plate Number:</label>
        <div className="input-container">
        <i className="fa fa-subway icon"></i>
        <input
        onChange={handleChange("platenumber")}
        value={platenumber}
        placeholder="Enter Plate Number"
        type="text"
        className="input-field"
        required
      />
     
      </div>
      </div>
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Price:</label>
        <div className="input-container">
        <i className="fa fa-subway icon"></i>
        <input
        onChange={handleChange("price")}
        value={price}
        placeholder="Enter Price"
        type="text"
        className="input-field"
        required
      />
     
      </div>
      </div>
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter AXLE:</label>
        <div className="input-container">
        <i className="fa fa-ship icon"></i>
        <input
        onChange={handleChange("axle")}
        value={axle}
        placeholder="Enter AXLE"
        type="text"
        className="input-field"
      />
     
      </div>
      </div>
      <div className="form-group">
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
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Power:</label>
        <div className="input-container">
        <i className="fa fa-battery-full icon"></i>
        <input
        onChange={handleChange("power")}
        value={power}
        placeholder="Enter Engine Type"
        type="text"
        className="input-field"
      />
     
      </div>
      </div>
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Tonnage Capacity:</label>
        <div className="input-container">
        <i className="fa fa-plug icon"></i>
        <input
        onChange={handleChange("tonnagecapacity")}
        value={tonnagecapacity}
        placeholder="Enter Tonnage Capacity"
        type="text"
        className="input-field"
      />
     
      </div>
      </div>
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Enter Specification:</label>
        <div className="input-container">
        <i className="fa fa-car icon"></i>
        <input
        onChange={handleChange("specification")}
        value={specification}
        placeholder="Enter Specification"
        type="text"
        className="input-field"
      />
     
      </div>
      </div>
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Truck Number:</label>
        <div className="input-container">
        <i className="fa fa-bus icon"></i>
        <input
        onChange={handleChange("trucknumber")}
        value={trucknumber}
        placeholder="Enter Truck Number"
        type="text"
        className="input-field"
      />
     
      </div>
      </div>
      <div className="form-group">
      <label className="text-mute text-primary-p" style={{color: "#000000"}}>Status:</label>
                    <select
                   onChange={handleChange("status")}
                   value={status}
                    className="form-control"
                    required
                    >
                        <option>Please Select</option>
                        <option value="company">Company</option>
                        <option value="hire">Hire</option>
                        <option value="sale">Sale</option>
                       
                       
                      
                    </select>
      </div>
      <div className="form-group">
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
      <button onClick={ closeModal} style={{ backgroundColor: '#fe0002'}}  className="btn btn-danger button3">Back</button>
<button type="submit" onClick={onSubmit("truck")}  style={{backgroundColor: '#008ED3',marginLeft: '10px'}}  className="btn btn-danger button3">Submit</button>
      </form>
     
  
</div>
)
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
  else if(infotype === "newdriver"){
    return adddriver();

  }
  else if(infotype === "details"){
    return details();

  }
  else if (infotype === "status"){
    return addstatusform ();

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
        
        
        {returnfunc()}
       
        
        
       
      </Modal>     
        </div>
    )

}

export default Modalcompoment;

