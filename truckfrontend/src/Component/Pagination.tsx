import React from "react";
type Props ={
    postsPerpage: number;
    totalPost: number;
    paginate: any;
    currentPage: number;
}
const Pagination = ({postsPerpage, totalPost, paginate, currentPage}: Props)=>{
    const pageNumbers = [];
    for(let i=1; i <= Math.ceil(totalPost/postsPerpage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav id="pagination">
            <ul className="pagination">
                {pageNumbers.map((number)=>(
                    <li 
                    key={number} 
                    className="page-item" 
                    style={{
                        backgroundColor: "#4DB151",
                        marginRight: "0.6rem",
                    }}>

                        <button 
                        onClick={()=> paginate(number)}
                        
                        className="page-link"
                        style={currentPage === number ?
                            {
                            color: "#ffffff",
                            backgroundColor: "#DA251C",
                            borderRadius: "50%",
                          } :{color: "#ffffff",
                          backgroundColor: "#000000",
                          borderRadius: "50%",}}

                        >
                            {number}

                        </button>
                    </li>
                )

                )}

            </ul>

        </nav>
    )

}


export default Pagination;
