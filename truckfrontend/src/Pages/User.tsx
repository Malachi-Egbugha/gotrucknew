import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import Search from "../Component/Search";
import Layouttwo from "../Layout/Layouttwo";
import { getallwebusers } from '../Api/apicall';
import {useQuery,useQueryClient} from 'react-query';
import Adduser  from '../Component/Adduser';
import Pagination from '../Component/Pagination';
//import Updateuser from '../Component/Updateuser';
//import {updateuser} from "../Api/apicall";
import {Spinner} from 'react-bootstrap';


const User = () => {
  
  const [searchitem, setSearchitem] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalchange, setModalchange] = useState(false);
  const [modalchangeid, setModalchangeid] = useState('');
  const [modalchangetype, setModalchangetype] = useState('');
  const [postsPerpage] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1)
   //set index of first and lastpage
const indexOfLastPost = currentPage * postsPerpage;
let indexOfFirstPost = indexOfLastPost - postsPerpage;
//set currentpost


const {data,isLoading,isError} = useQuery('webusers', async() => await getallwebusers(),{refetchInterval: 50000,refetchOnReconnect:false, refetchIntervalInBackground: true, cacheTime: 100000});
let currentPost =isLoading?"":searchitem === "" ? data.webusers.slice(indexOfFirstPost, indexOfLastPost) : data.webusers;

const searchmethod =(event:any) =>{
  setSearchitem(event.target.value);

};

  const paginate = (pageNumber:number) => {
    //setInfo("");
    setCurrentPage(pageNumber);
  };
  
   
  const setinfo = () => {
    setModalIsOpen(true);
  

  }
  const updatedata = (id:any,datatype:any) =>{
    setModalchangeid(id);
    setModalchangetype(datatype);
    setModalchange(true);
    


  }
  


  return (
    <Layouttwo>
      <div className="main__container">
     
      
        <div className="main__title">
          <img src="assets/banner.jpg" alt="" />
          <div className="main__greeting">
            <h1 className="text-primary-p">USER MANAGEMENT</h1>
       
          </div>
        </div>

        <hr className="main__cards" />
     
        <div className="maincontentone"  style={{padding: "30px",background: "#ffffff",fontSize: "1rem"}}>
       
    <div className="row">
      <div className="col-10">
        <Search searchmethod={searchmethod} placeholder="Search..................." />
      
        </div>
        <div className="col-2">
          <button className="card1" style={{padding:"2px",background: "#4DB151",color:"#fff",fontSize: "1.5rem"}} onClick={()=>setinfo()}>Add User</button>

        </div>
        </div>
        {isLoading ?<div style={{width:"100%",minHeight:"50vh", justifyContent:"center", display:"flex", alignItems:"center"}}><Spinner animation="grow" /></div> :
        <div>
  <table className="table" >
    <thead>
      <tr>
        <th  scope="col"></th>
        <th  scope="col">S/N</th>
        <th  scope="col">First Name</th>
        <th  scope="col">Last Name</th>
        <th  scope="col">Phone</th>
        <th  scope="col">Email</th>
        <th  scope="col">Update Status</th>
        <th scope="col">ResetPassword</th>
        <th scope="col">Change Email</th>
        <th scope="col">Change Access Type</th>
        <th  scope="col">Date</th>
        
      </tr>
    </thead>
    <tbody>
      
      {
        currentPost.filter((val:any)=>{

          if(searchitem === ""){
            return val;
          }
          else if(typeof(val.firstname) !== "undefined" && typeof(val.lastname) !== "undefined" && typeof(val.phone) !== "undefined" && typeof(val.email) !== "undefined"  && ((val.firstname ? val.firstname.toLowerCase().includes(searchitem.toLowerCase()) : false) || (val.lastname ? val.lastname.toLowerCase().includes(searchitem.toLowerCase()): false )|| (val.phone ? val.phone.includes(searchitem) : false) || (val.email?val.email.toLowerCase().includes(searchitem.toLowerCase()):false) )){
            return val;
    
          }

        }).map((u:any, i:any) =>(
          <tr>
          <td></td>
          <td>{i + 1}</td>
             <td>{u.firstname}</td>
             <td>{u.lastname}</td>
             <td>{u.phone}</td>
             <td>{u.email}</td>
             <td>{u.status}</td>
             <td>reset password</td>
             <td>change email</td>
             <td>{u.usertype}</td>
             <td>
             
               {u.createdAt}
               
               </td>
           
             </tr>

        ))
      
      
      }

      
    
    </tbody>
  </table>
 <Pagination postsPerpage={postsPerpage} totalPost={data.webusers.length} paginate={paginate} currentPage={currentPage} />

  <Adduser modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
  </div>
}
  
  {//<Updateuser modalchange={modalchange} setModalchange={setModalchange} modalchangeid={modalchangeid}  modalchangetype={modalchangetype} />
}

          </div>
          
              

      
              
      </div>
    </Layouttwo>
  );
};
export default User;
