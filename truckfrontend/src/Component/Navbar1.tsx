import React,{useState} from "react";
import { Link,RouteComponentProps, withRouter} from "react-router-dom";
import {signout} from "../Api/apicall";
import { History } from 'history';
//import Updateuser from '../Component/Updateuser';
//import {store} from '../Api/apiconfig';
interface IProps extends RouteComponentProps{
    history: History;
    // any other props that come into the component
}

const Navbar1 = ({ history }: IProps) => {
  const toggleSidebar = async () => {
    //define central store nd access redux
    var sidebar:any = document.getElementById("sidebar");
    sidebar.classList.add("sidebar_responsive");
  };
 
  const [modalchange, setModalchange] = useState(false);
  const [modalchangeid, setModalchangeid] = useState('');
  const [modalchangetype, setModalchangetype] = useState('');
 const signoutnow =async() => {
  await signout();
   localStorage.removeItem("gotruck");
   history.push("/")
  };
  
  const updatedata = (id:any,datatype:any) =>{
    setModalchangeid(id);
    setModalchangetype(datatype);
    setModalchange(true);
    


  }
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={toggleSidebar}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
     
           
        <span
      
            
            onClick={
                () => signoutnow()
            }
            
        
            className="nav-link"
            id="linkcheck"
            style={{ cursor: "pointer", color: "red" }}
          >
            <i className="fa fa-power-off" style={{marginRight: "5px"}}></i>
            Log out 
          </span>
        
      
       
      </div>
      <div>
         <h2 className="font-bold" >Gotruck Management Application</h2>
      </div>
      <div className="navbar__right">
    
      <span
      
      
            
      onClick={
          () => signoutnow()
      }
      
  
      className="nav-link"
      style={{ cursor: "pointer", color: "red" }}
    >
      <i className="fa fa-power-off" style={{marginRight: "5px"}}></i>
      Log out
    </span>
    <span 
    //onClick={()=>updatedata(store("id")+"/change","password",)} 
    className="nav-link" style={{ cursor: "pointer", color: "#2e4a66" }}>
        <i className="fa fa-key" aria-hidden="true" style={{marginRight: "5px"}}></i>
        Update Password
         
        </span>
        <Link to="#">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        </Link>
        
      </div>
      {
       // <Updateuser modalchange={modalchange} setModalchange={setModalchange} modalchangeid={modalchangeid}  modalchangetype={modalchangetype} />
        }
    </nav>
  );
};

export default withRouter(Navbar1);
