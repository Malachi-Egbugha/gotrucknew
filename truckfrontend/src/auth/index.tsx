//check if is current path
import { History } from 'history';
import {store} from '../Api/apiconfig';
type Props = {
  
    email: string;
    password: string;
    token:string;
    _id:any;
    
}
export const isActive = (history: History, path: string) => {
  let activate = history.location.pathname === path ? true : false;
  return activate;
};


export const authenticate = (data:Props, next:any) => {
 
    localStorage.setItem("gotruck", JSON.stringify(data.token));
    next();
  
};


//check if super admin
export const isSuperadmin = () => {
  let activate = store("usertype") === "superadmin" ? true : false;
  return activate;
};
//check if is admin
export const isAdmin = () => {
 
  let activate = store("usertype") === "admin" ? true : false;
  return activate;
};
//check if is normal user
export const isNormal = () => {
 
  let activate = store("usertype") === "management" ? true : false;
   console.log(activate);
  return activate;
};
//check if user is signed in
export const isAuthenticated = () => {
  if (localStorage.getItem("gotruck")) {
    return JSON.parse(localStorage.getItem("customerapp") || '{}');
  } else {
    return false;
  }
};
