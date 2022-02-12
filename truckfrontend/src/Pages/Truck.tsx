import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Layouttwo from "../Layout/Layouttwo";
import {getalltrucks} from "../Api/apicall";
import {Spinner} from 'react-bootstrap';
import {useQuery,useQueryClient} from 'react-query';
import Modalcompoment from "../Component/Modalcomponent";
import Search from "../Component/Search";
import Pagination from '../Component/Pagination';



const Truck = () => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setIsOpened] = useState(false);
  const [infotype, setInfotype] = useState("");
  const [searchitem, setSearchitem] = useState<string>('');
  const [info, setInfo] = useState<any>();
  const [postsPerpage] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1)
   //set index of first and lastpage
const indexOfLastPost = currentPage * postsPerpage;
let indexOfFirstPost = indexOfLastPost - postsPerpage;
//set currentpost
  const  setIsOpen =  (status:any) =>{
    queryClient.invalidateQueries('trucks');
    setIsOpened(status);
  
  }
  const setinfo = (infotype:any, info:any) =>{
    setInfo(info);
    setInfotype(infotype);
    setIsOpen(true);
  };
  const paginate = (pageNumber:number) => {
    //setInfo("");
    setCurrentPage(pageNumber);
  };
  
   //load default state
 const {data,isLoading,isError} = useQuery('trucks', async() => await await getalltrucks(),{refetchInterval: 50000,refetchOnReconnect:false, refetchIntervalInBackground: true, cacheTime: 100000});
 
 let currentPost =isLoading?"":searchitem === "" ? data.trucks.slice(indexOfFirstPost, indexOfLastPost) : data.trucks;
 const searchmethod =(event:any) =>{
   
  setSearchitem(event.target.value);
 
  

};
  return (
    <Layouttwo>
       <div className="main__container">
     
        <div className="main__title">
          <img src="assets/banner.jpg" alt="" />
          <div className="main__greeting">
            <h1 className="text-primary-p">Trucks Management</h1>
       
          </div>
        </div>
        <div style={{marginBottom: "1px", padding: "0px", marginTop:"10px"}}>
        <button onClick={()=>setinfo("newtruck","newtruck")} className="button2 text-primary-p">ADD TRUCK</button>
        </div>
        <hr style={{marginTop: "0px"}} className="main__cards" />
        <Search searchmethod={searchmethod} placeholder="Search by Plate Number,Brand,Model,Truck Number" />
        {isLoading ?<div style={{width:"100%",minHeight:"50vh", justifyContent:"center", display:"flex", alignItems:"center"}}><Spinner animation="grow" /></div> :
      <div>
       
        <table className="table table-striped">
        <thead>
         
          <tr>
            
            <th scope="col"></th>
            <th scope="col">S/N</th>
            <th scope="col">Year</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">RearAxle</th>
            <th scope="col">Engine type</th>
            <th scope="col">Driving Type</th>
            <th scope="col">Body Type</th>
            <th scope="col">Fuel Tank</th>
            <th scope="col">Tonnage</th>
            <th scope="col">tire</th>
            <th scope="col">color</th>
            <th scope="col">Truck Number</th>
            <th scope="col">price</th>
            <th scope="col">Status</th>
            <th>View</th>
            <th scope="col"></th>
           
       
 
 
    
  
    
    
  
    

 
            
            
            
          </tr>
        </thead>
        <tbody>
         
          {
            currentPost.filter((val:any) =>{
              if(searchitem === ""){
                return val;
              }
              else if(typeof(val.platenumber) !== "undefined" && typeof(val.brand) !== "undefined" && typeof(val.model) !== "undefined" && typeof(val.trucknumber) !== "undefined"  && ((val.platenumber ? val.platenumber.includes(searchitem) : false) || (val.brand ? val.brand.includes(searchitem): false )|| (val.model? val.model.includes(searchitem) : false) || (val.trucknumber?val.trucknumber.includes(searchitem):false) )){
                return val;
        
              }

            }).map((u:any,i:any)=>(
              <tr>
              <td></td>
              <td>{i + 1}</td>
             <td>{u.year}</td>
             <td>{u.brand}</td>
             <td>{u.model}</td>
             <td>{u.rearaxle}</td>
             <td>{u.enginetype}</td>
             <td>{u.drivingtype}</td>
             <td>{u.bodytype}</td>
             <td>{u.fueltank}</td>
             <td>{u.tonnage}</td>
             <td>{u. tire}</td>
             <td>{u.color}</td>
             <td>{u.trucknumber}</td>
             <td>{u.price}</td>
             <td>{u.status}</td>
             <td><i className="fa fa-eye" style={{ backgroundColor: "#4DB151,",padding:"4px",cursor:"pointer" }} onClick={()=>setinfo("pix",u.imageurl)} aria-hidden="true"></i></td>
             </tr>

            ))
           
          }
          
          </tbody>
          </table>
          <Pagination postsPerpage={postsPerpage} totalPost={data.trucks.length} paginate={paginate} currentPage={currentPage} />
          </div>
}
       
     
              
        
              
      </div>
      <Modalcompoment modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} infotype={infotype} info={info}  />
      
    </Layouttwo>
  );
};
export default Truck;


