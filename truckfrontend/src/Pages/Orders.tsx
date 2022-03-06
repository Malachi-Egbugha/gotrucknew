import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Layouttwo from "../Layout/Layouttwo";
import Moment from 'react-moment';
import {getallorders} from "../Api/apicall";
import {Spinner} from 'react-bootstrap';
import {useQuery,useQueryClient} from 'react-query';
import Modalcompoment from "../Component/Modalcomponent";
import Search from "../Component/Search";
import Pagination from '../Component/Pagination';



const Orders = () => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setIsOpened] = useState(false);
  const [searchitem, setSearchitem] = useState<string>('');
  const [postsPerpage] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [infotype, setInfotype] = useState("");
  const [info, setInfo] = useState<any>();
   //set index of first and lastpage
const indexOfLastPost = currentPage * postsPerpage;
let indexOfFirstPost = indexOfLastPost - postsPerpage;
  const {data,isLoading,isError,error} = useQuery('orders', async() => await getallorders(),{refetchInterval: 50000,refetchOnReconnect:false, refetchIntervalInBackground: true, cacheTime: 100000});
  let currentPost =isLoading?"":searchitem === "" ? data.orders.slice(indexOfFirstPost, indexOfLastPost) : data.orders;
  const  setIsOpen =  (status:any) =>{
    queryClient.invalidateQueries('orders');
    setIsOpened(status);
  
  };
  const setinfo = (infotype:any, info:any) =>{
    setInfo(info);
    setInfotype(infotype);
    setIsOpen(true);
  };
  const paginate = (pageNumber:number) => {
    //setInfo("");
    setCurrentPage(pageNumber);
  };
  const searchmethod =(event:any) =>{
    setSearchitem(event.target.value);
  
  };
  
  return (
    <Layouttwo>
       <div className="main__container">
         
     
        <div className="main__title">
          <img src="assets/banner.jpg" alt="" />
          <div className="main__greeting">
            <h1 className="text-primary-p">Manage Orders</h1>
       
          </div>
        </div>
      
        <hr style={{marginTop: "0px"}} className="main__cards" />
        <Search searchmethod={searchmethod} placeholder="Search by Firstname,Phone Number, Email" />
        {isLoading ?<div style={{width:"100%",minHeight:"50vh", justifyContent:"center", display:"flex", alignItems:"center"}}><Spinner animation="grow" /></div> :
        <div>
       
        <table className="table table-striped">
        <thead>
         
          <tr>
         
            
            <th scope="col"></th>
            <th scope="col">S/N</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">View Orders</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
           
          </tr>
        </thead>
        <tbody>
         
         {
           currentPost.filter((val:any) =>{
            if(searchitem === ""){
              return val;
            }
            else if(typeof(val.name) !== "undefined" && typeof(val.email) !== "undefined" && typeof(val.phonenumber) !== "undefined"  && ((val.name ? val.name.toLowerCase().includes(searchitem.toLowerCase()) : false) || (val.email ? val.email.includes(searchitem): false )|| (val.phonenumber? val.phonenumber.includes(searchitem) : false)  )){
              return val;
      
            }

          }).map((u:any,i:any)=>(
              <tr>
              <td></td>
              <td>{i + 1}</td>
             <td>{u.name}</td>
             <td>{u.email}</td>
             <td>{u.phonenumber}</td>
             <td>{u.total_price}</td>
             <td>{u.status}</td>
             <td><i className="fa fa-eye" style={{ backgroundColor: "#4DB151,",padding:"4px",cursor:"pointer" }} onClick={()=>setinfo("orderdetails",u.products)} aria-hidden="true"></i></td>
             <td>
               <Moment format="YYYY/MM/DD">{u.created_at}</Moment></td>
             
            
             </tr>

          
          ))
          
         }
          </tbody>
          </table>
          <Pagination postsPerpage={postsPerpage} totalPost={data.orders.length} paginate={paginate} currentPage={currentPage} />
        
          </div>
}
        
     

       
     
              
        
              
      </div>
      <Modalcompoment modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} infotype={infotype} info={info}  />
      
      
    </Layouttwo>
  );
};
export default Orders;


