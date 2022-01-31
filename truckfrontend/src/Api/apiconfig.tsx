import jwt_decode from 'jwt-decode';

export const LOCAL = "http://localhost:5050";
export const TRUCK = "http://localhost:6001";

//export const LOCAL = "https://driverservices.herokuapp.com";
//export const TRUCK = "https://truckservices.herokuapp.com";



export const store = (value:any) => {

    const { token } = JSON.parse(localStorage.getItem("gotruck") || '{}');
    
    const jwtDecode:any = jwt_decode(token);

  if (value === "id") {
        return jwtDecode.id
    }

    if (value === "usertype") {
        return jwtDecode.usertype
    }

   
}

export const clearStore = () => {
localStorage.clear()
//console.log("Cache Cleared....")
}

