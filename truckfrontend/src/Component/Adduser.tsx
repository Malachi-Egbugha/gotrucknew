import React,{useState} from "react";
import Modal from "react-modal";
import {postwebusers} from "../Api/apicall";
import Response from "./Response";

type Props = {
    
  modalIsOpen: any;
  setModalIsOpen: any;
  
};
 

const Adduser = ({modalIsOpen,setModalIsOpen}:Props)=>{
  const [error, setError] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    firstname:"",
    lastname:"",
    phone:"",
  });
  const {
    email,
    firstname,
    lastname,
    phone,
 

  } = values;
    //handle change input
  const handleChange =  (name:string) => async (event:React.ChangeEvent<any>) => {
    setValues({ ...values,[name]: event.target.value });
  
  };
  //handle form submission
  const clickSubmit = async (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    //set loading to true
   //submit to backend through submit api
   let submitdata = await postwebusers({firstname,lastname,phone,email});
  
   //update error state if error and vice versal
  submitdata.error ? setErrorMessage(submitdata.error) : setErrorMessage("");
   submitdata.error ? setError("error") : setError("noerror");
   //clear values except error
  
   setValues({...values,email:"",phone:"",firstname:"",lastname:""});
   
  
    
  };
 
const adduserform = () =>(
  <div>
<form className="form-horizontal">
<div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>FirstName:</label>
          <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
          onChange={handleChange("firstname")}
          value={firstname}
          placeholder="Enter FirstName"
          type="text"
          className="input-field"
        />
       
        </div>
        </div>
        <div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>LastName:</label>
          <div className="input-container">
          <i className="fa fa-user-o icon"></i>
          <input
          onChange={handleChange("lastname")}
          value={lastname}
          placeholder="Enter LastName"
          type="text"
          className="input-field"
        />
       
        </div>
        </div>
        <div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>Phone:</label>
          <div className="input-container">
          <i className="fa fa-phone icon"></i>
          <input
          onChange={handleChange("phone")}
          value={phone}
          placeholder="Enter Phone Number"
          type="phone"
          className="input-field"
        />
       
        </div>
        </div>
<div className="form-group">
        <label className="text-mute text-primary-p" style={{color: "#000000"}}>Email:</label>
          <div className="input-container">
          <i className="fa fa-envelope icon"></i>
          <input
          onChange={handleChange("email")}
          value={email}
          placeholder="Enter Email Address"
          type="email"
          className="input-field"
        />
       
        </div>
        </div>
        </form>
        <button style={{borderRadius: "5px", padding: '10px', backgroundColor: '#fe0002'}}  className="btn btn-danger" onClick={() => setModalIsOpen(false)}>Back</button>
<button  style={{borderRadius: "5px", padding: '10px', backgroundColor: '#008ED3',marginLeft: '10px'}}  className="btn btn-danger" onClick={clickSubmit}>Submit</button>
    
</div>
);
  
  
  const customStyles = {
    content: {
    
      top: '21%',
      left: '40%',
      right: '40%',
      bottom: '21%',
      boxShadow: '0 0 10px 0 rgba(0,0,97,0.5)',
      overflow: 'auto',
    borderRadius:'4px',
    outline: 'none',
    },

    overlay: {
      backgroundColor: "rgba(0,0,0,0.75)",
     
    }
  };

  
    Modal.setAppElement("#root");
    return(
        <div>
                <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={() =>{setValues({ ...values, email:"" });setError("");setErrorMessage(""); setModalIsOpen(false)}}
       
       
      >
        
        
    <Response setModalIsOpen={setModalIsOpen}  errormessage={errormessage} error={error} adduserform={adduserform} setError={setError} setErrorMessage={setErrorMessage} />


          
      </Modal>
     
        </div>
    )

}

export default Adduser;