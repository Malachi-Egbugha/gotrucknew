import React from "react";
import Swal from 'sweetalert2';
type Props = {
    
    error: any;
    adduserform: any;
    errormessage: any;
    setModalIsOpen: any;
    setError:any;
    setErrorMessage:any;
  
   
  
  
  }

const Response = ({error,adduserform,errormessage,setModalIsOpen,setError,setErrorMessage}:Props) => {
    const response = () => {
        if(error === "error")
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errormessage}`,
            footer: '<span>Contact Administrator: 070000000</span>'
          });
          setError(" ");
          setErrorMessage(" ");
          setModalIsOpen(false);
    
        }
        else if(error === "noerror")
         { 
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          });
          setError("");
          setErrorMessage("");
          setModalIsOpen(false);
         } 
        else{
          return adduserform();
        }
    
      }
  
 
  return (
      <div>
      {
          response()
        }
        </div>
    
  );
};

export default Response;
