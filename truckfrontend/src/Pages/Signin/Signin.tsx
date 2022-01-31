import { Redirect } from "react-router-dom";
import Layoutone from "../../Layout/Layoutone";
//import { GoogleLogin } from 'react-google-login';
import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import "./Signin.css";
import { signin } from "../../Api/apicall";
import { authenticate } from "../../auth";

const Signin = () => {
const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const {
    email,
    password,
    error,
    loading,
    redirectToReferrer,
  } = values;

  //handle change input
  const handleChange = (name:string) => (event:React.ChangeEvent<any>) => {
    setValues({ ...values, error: "", [name]: event.target.value });
    
  };
   //handle form submission
  const clickSubmit = async (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    
    //access sign in api
    let signindata = await signin({email, password});
  
    if(signindata.error){
      setValues({...values, error: signindata.error,loading: false });

    }
    else if(signindata.status === false){
      setValues({...values, error: signindata.msg,loading: false });

    }
    else{
      authenticate(signindata,() =>{
        setValues({...values, redirectToReferrer: true});
      });


    }
    
   
    
  };

 
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-primary-p" style={{color: "#000000"}}>Email:</label>
      <div className="input-container">
        <i className="fa fa-envelope icon" style={{ backgroundColor: "#4DB151"}}></i>
        <input
        
          value={email}
          onChange={handleChange("email")}
          type="email"
         className="input-field"
        />
        </div>
      </div>
      <div className="form-group">
        <label className="text-primary-p" style={{color: "#000000"}}>Password:</label>
        <div className="input-container">
          <i className="fa fa-key icon" style={{ backgroundColor: "#4DB151"}}></i>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="input-field"
        />
        </div>
      </div>
      <button
        type="submit"
         onClick={clickSubmit}
        className="btn btn-primary"
        style={{ backgroundColor: "#4DB151",  width: "100%" ,color:"#fff", fontWeight:"bold"}}
      >
        LOGIN
      </button>
      
    </form>
  );
   //show loading
  const showLoading = () =>
    loading && (
      <div className="spinning">
        <div></div>
        <div></div>
      </div>
    );
//error div
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none", fontSize: "1rem", padding: "2px" }}
    >
      {error}
    </div>
  );
  // redirect user to dashboard if referer is true
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/dashboard" />;
    }
  };
  return (
    <Layoutone className="loginbanner">
      
        <div className="card">
          
          <div className="card-header">
            <img alt="logo" src={logo} style={{ width: "150px", marginBottom: "50px",marginTop: "30px" }}/><br/>
            <span className="text-main-p">GOTRUCK MOBILE APP</span>
          </div>
          <div className="card-body">
            {showError()}
            {showLoading()}
            {redirectUser()}
            {signUpForm()}
           
            
          </div>
        </div>
      
    </Layoutone>
  );
};

export default Signin;
