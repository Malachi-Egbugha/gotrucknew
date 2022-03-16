import React,{useState,useEffect} from "react";
import {posttrucksetting} from "../Api/apicall";
import Swal from 'sweetalert2';
import {useQuery,useQueryClient} from 'react-query';
import {Spinner} from 'react-bootstrap';
import Moment from "react-moment";
type Props = {
    named: string;
    placeholder: string;
    typeset: string;
    setSubmitstatus:any;
}
const Addsettings = ({named, placeholder,typeset,setSubmitstatus}: Props) =>
{

  const [valuee, setValuee] = useState({
    name: "",
    type: typeset,
   
  });
  const handleChange =  (name:string) => async (event:React.ChangeEvent<any>) => {
    setValuee({ ...valuee,name:event.target.value });
    
  
  };
  

  const {
    name,
   } = valuee;
  const submittsetting = async() =>{
    setValuee(valuee);
    //validate field
    //submit data
    let submitdata = await posttrucksetting(valuee);
   
    setValuee(
      {
      name: "",
    type: "",}
    );
    //retrun response
    submitdata.status ?  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500
    }) : Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${submitdata.error}`,
      footer: '<span>Contact Administrator: 070000000</span>'
    });
   
    setSubmitstatus();
  }
 
return(
<>
<div className="col-10">
<div className="input-container">
    <i className="fas fa-search icon"></i>
    <input placeholder={placeholder}
     onChange={handleChange("name")}
    type="text"
    value={name}
    className="input-field"
    />


</div>
  </div>
  <div className="col-2">
  <button className="card1" style={{padding:"2px",background: "#4DB151",color:"#fff",fontSize: "1rem"}} onClick={()=>submittsetting()}>{named}</button>

</div>
</>
)
}

export default Addsettings;