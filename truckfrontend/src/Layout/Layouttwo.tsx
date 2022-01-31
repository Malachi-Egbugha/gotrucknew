import Navbar1 from '../Component/Navbar1';
import Sidebar from '../Component/Sidebar';

import './Layouttwo.css';

import React from 'react';
type Props = {
    children: React.ReactNode;
}


const Layouttwo: React.FC<Props> = ({children}) => 
{

return(
    <div className="contain">
        <Navbar1  />
        <main>
           {children}
        </main>
        
        <Sidebar/>
        
       
       
        
    </div>

)
}
export default Layouttwo;
