import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./Pages/Signin/Signin";
import Dashboard from "./Pages/Dashboard";
import Driver from "./Pages/Driver";
import Truck from "./Pages/Truck";
import User from "./Pages/User";
import {
  PrivateRoute,SuperAdminRoute,SuperAdminAdminRoute
} from "./auth/Authenticateroute";



const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} /> 
        <PrivateRoute path="/dashboard" exact component={Dashboard} /> 
        <PrivateRoute path="/driver" exact component={Driver} /> 
        <PrivateRoute path="/truck" exact component={Truck} /> 
        <PrivateRoute path="/users" exact component={User} /> 
      
        
        
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

