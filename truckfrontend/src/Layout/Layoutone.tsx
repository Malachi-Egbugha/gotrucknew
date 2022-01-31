import React from 'react';

type Props = {
    className: string;
    children: any;
  
}

const Layoutone: React.FC<Props> = ({className, children}) =>
     
     
    
     (
     <div className={className}>
        
          {children}
          

     </div>
     )
     
     


export default Layoutone;