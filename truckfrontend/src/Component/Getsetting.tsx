import React,{useState,useEffect} from "react";
import {gettrucksetting} from "../Api/apicall";
import {useQuery,useQueryClient} from 'react-query';
import Moment from "react-moment";
const Getsettings = (gettype:any) =>{
    const [isLoading, setisLoading] = useState(true);
    const [values, setValues] = useState<any>([]);
    
    const fetchdata = async () =>{
      setValues([]);
      let getsetting =await gettrucksetting(`${gettype.gettype}`);
     //console.log('check',getsetting.setsettings);
      if(getsetting.status == true){
        setValues([...getsetting.setsettings]);
        
       
  
      }
      //getsetting.status?setValues({...values,...getsetting.setsettings}):"";
      
      
    };
    useEffect(() =>{
      fetchdata();
    },[]);
  
  
  
  
    
    //let currentPost =isLoading?"":data.setsettings;
    const setinfo =(infotype:any, info:any) =>{
      console.log(info);
    }
    
  
    return(
      <div style={{ height: "30vh", overflowY:"scroll", width:"100%" }}>
      <table className="table" >
  <thead>
    <tr>
    <th  scope="col"></th>
      <th  scope="col">S/N</th>
      <th  scope="col">Model Name</th>
      <th  scope="col">Date</th>
      <th  scope="col">Edit</th>
      </tr>
      </thead>
      <tbody>
        {
          
          values.map((u:any,i:any) =>(
        <tr key={i}>
          <td></td>
          <td>{i + 1}</td>
          <td>{u.name}</td>
          <td>
          <Moment format="YYYY/MM/DD">
            {u.created_at}
            </Moment>
            </td>
          <td>
          <i className="fa fa-pencil-square-o" style={{ backgroundColor: "#4DB151,",padding:"4px",cursor:"pointer" }} 
          onClick={()=>setinfo('editsetting',u)}
          aria-hidden="true"></i>
          </td>
        </tr>
          )
          )
        
        }
      </tbody>
      </table>
      </div>
    )
  }

  export default Getsettings;