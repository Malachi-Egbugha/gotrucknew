import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Layouttwo from "../Layout/Layouttwo";
import {getalldrivers} from "../Api/apicall";
import {Spinner} from 'react-bootstrap';
import {useQuery,useQueryClient} from 'react-query';
import Modalcompoment from "../Component/Modalcomponent";
import Search from "../Component/Search";
import Pagination from '../Component/Pagination';



const Driver = () => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setIsOpened] = useState(false);
  const [searchitem, setSearchitem] = useState<string>('');
  const [infotype, setInfotype] = useState("");
  const [info, setInfo] = useState<any>();
  const [postsPerpage] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1)
   //set index of first and lastpage
const indexOfLastPost = currentPage * postsPerpage;
let indexOfFirstPost = indexOfLastPost - postsPerpage;
//set currentpost
  
  //fet all drivers at componenent load
const  setIsOpen =  (status:any) =>{
  queryClient.invalidateQueries('drivers');
  setIsOpened(status);

}
  const setinfo = (infotype:any, info:any) =>{
    setInfo(info);
    setInfotype(infotype);
    setIsOpen(true);
  }
  const {data,isLoading,isError,error} = useQuery('drivers', async() => await getalldrivers(),{refetchInterval: 50000,refetchOnReconnect:false, refetchIntervalInBackground: true, cacheTime: 100000});

  let currentPost =isLoading?"":searchitem === "" ? data.users.slice(indexOfFirstPost, indexOfLastPost) : data.users;

  const searchmethod =(event:any) =>{
    setSearchitem(event.target.value);
  
  };
  const paginate = (pageNumber:number) => {
    //setInfo("");
    setCurrentPage(pageNumber);
  };
  return (
    <Layouttwo>
       <div className="main__container">
     
        <div className="main__title">
          <img src="assets/banner.jpg" alt="" />
          <div className="main__greeting">
            <h1 className="text-primary-p">Drivers Management</h1>
       
          </div>
        </div>
        <div style={{marginBottom: "1px", padding: "0px", marginTop:"10px"}}>
        <button onClick={()=>setinfo("newdriver","newdriver")} className="button2 text-primary-p">ADD DRIVER</button>
        </div>
        <hr className="main__cards" />
        <Search searchmethod={searchmethod} placeholder="Search by Firstname,Lastname,Phone Number, Email" />
        {isLoading ?<div style={{width:"100%",minHeight:"50vh", justifyContent:"center", display:"flex", alignItems:"center"}}><Spinner animation="grow" /></div> :
      <div>
       
        <table className="table table-striped">
        <thead>
         
          <tr>
            
            <th scope="col"></th>
            <th scope="col">S/N</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">DOB</th>
            <th scope="col">Usertype</th>
            <th scope="col">Drivers Licence</th>
            <th scope="col">Years of Experience</th>
            <th scope="col">Status</th>
            <th scope="col">More Details</th>
            <th scope="col">Change Status</th>
            <th scope="col">Passport</th>
           
            
            
            
            
          </tr>
        </thead>
        <tbody>
         
          {
            currentPost.filter((val:any) =>{
              if(searchitem === ""){
                return val;
              }
              else if(typeof(val.firstname) !== "undefined" && typeof(val.lastname) !== "undefined" && typeof(val.phone) !== "undefined" && typeof(val.email) !== "undefined"  && ((val.firstname ? val.firstname.toLowerCase().includes(searchitem.toLowerCase()) : false) || (val.lastname ? val.lastname.toLowerCase().includes(searchitem.toLowerCase()): false )|| (val.phone ? val.phone.includes(searchitem) : false) || (val.email?val.email.toLowerCase().includes(searchitem.toLowerCase()):false) )){
                return val;
        
              }

            }).map((u:any,i:any)=>(
              <tr>
              <td></td>
              <td>{i + 1}</td>
             <td>{u.firstname}</td>
             <td>{u.lastname}</td>
             <td>{u.phone}</td>
             <td>{u.email}</td>
             <td>{u.address}</td>
             <td>{u.dob}</td>
             <td>{u.usertype}</td>
             <td>{u.driverlicencenumber}</td>
             <td>{u.yearsofexperience}</td>
             <td>{u.status}</td>
            
             <td><i className=" fa fa-info-circle" style={{ backgroundColor: "#4DB151,",padding:"4px",cursor:"pointer" }} onClick={()=>setinfo("details",{firstname:u.firstname,lastname:u.lastname,phone:u.phone,email:u.email,address:u.address,usertype:u.usertype,dob:u.dob,driverlicencenumber:u.driverlicencenumber,yearsofexperience:u.yearsofexperience,status:u.status,trucknumber:u.trucknumber,nextofkinname:u.nextofkinname,nextofkinaddress:u.nextofkinaddress, guarantorname:u.guarantorname,guarantoraddress: u.guarantoraddress,guarantorphone:u.guarantorphone,guarantorpassporturl:u.guarantorpassporturl,trunknumber:u.trunknumber,meansofidentity:u.meansofidentity })} aria-hidden="true"></i></td>
             <td><i className="fa fa-user-circle-o" style={{ backgroundColor: "#4DB151,",padding:"4px",cursor:"pointer" }} onClick={()=>setinfo("status",u._id)} aria-hidden="true"></i></td>
             <td><i className="fa fa-eye" style={{ backgroundColor: "#4DB151,",padding:"4px",cursor:"pointer" }} onClick={()=>setinfo("driverpix",u.passporturl)} aria-hidden="true"></i></td>
             </tr>

            ))
           
          }
          
          </tbody>
          </table>
          <Pagination postsPerpage={postsPerpage} totalPost={data.users.length} paginate={paginate} currentPage={currentPage} />

          </div>
       
        }
              
        
              
      </div>
      <Modalcompoment modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} infotype={infotype} info={info}  />
    </Layouttwo>
  );
};
export default Driver;


