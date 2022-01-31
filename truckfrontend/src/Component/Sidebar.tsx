import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isActive} from "../auth";
//import { isActive} from "../auth";
import logo from "../assets/images/logo.jpg";

const Sidebar = () => {
  let history = useHistory();
  const closeSidebar = async () => {
    //define central store nd access redux
    const  sidebar:any= document.getElementById("sidebar");
    sidebar.classList.remove("sidebar_responsive");
  };
 
  return (
    <div id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img"></div>
        <i className="fa fa-times" id="sidebarIcon" onClick={closeSidebar}></i>
      </div>
      <div style={{ display: "flex",backgroundColor:"#ffffff",  justifyContent: "center" }}>
        <img
          style={{ width: "100px",  background: "#fff", marginBottom: "50px",marginTop: "30px" }}
          src={logo}
          alt=""
        />
      </div>

      <div className="sidebar__menu">
        <div
          className=
          {
            
            isActive(history, "/dashboard")
              ? "sidebar__link active_menu_link"
             : "sidebar__link"
          }
        >
          <i className="fa fa-home"></i>
          <Link to="/dashboard" style=
          {
            
            isActive(history, "/dashboard")
              ? {color:"#4DB151"}
             : {}
          } >Dashboard</Link>
        </div>
        
{/**this handles the push notification */}
<div 
          className={
            
            isActive(history, "/driver")
              ? "sidebar__link active_menu_link"
              : "sidebar__link"
          }
        >
          <i className="fa fa-id-card"></i>
          <Link to="/driver"  style=
          {
            
            isActive(history, "/driver")
              ? {color:"#4DB151"}
             : {}
          }>Manage Drivers</Link>
        </div>
        {/**create users */}
        <div 
          className={
            
            isActive(history, "/truck")
              ? "sidebar__link active_menu_link"
              : "sidebar__link"
          }
        >
          <i className="fa fa-truck"></i>
          <Link to="/truck" style=
          {
            
            isActive(history, "/truck")
              ? {color:"#4DB151"}
             : {}
          }>Manage Trucks</Link>
        </div>
        {/**create trucks */}
<div

          className={
            isActive(history, "/users")
              ? "sidebar__link active_menu_link"
              : "sidebar__link"
          }
        >
          <i className="fas fa-users"></i>
          <Link to="/users" style=
          {
            
            isActive(history, "/users")
              ? {color:"#4DB151"}
             : {}
          }>User Management</Link>
        </div>
         {/**payment logs */}

        

            
              
              
</div>
    </div>
  );
};
export default Sidebar;

