import React from 'react'
import ReactPaginate from "react-paginate"

const Pagination = ({marginPages,pageRange,initialPage,pageCount,onPageChange}) => {
    return (
        
        <ReactPaginate
            marginPagesDisplayed={marginPages}
            pageRangeDisplayed={pageRange}
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            initialPage={initialPage}
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName={"paginate-wrap"}
            subContainerClassName={"paginate-inner"}
            pageClassName={"paginate-li"}
            pageLinkClassName={"paginate-a"}
            activeClassName={"paginate-active"}
            previousClassName={"paginate-previous"}
            nextClassName={"paginate-next"}
            breakLinkClassName={"paginate-break-a"}
            breakClassName={"paginate-previous"}
          />
          
    )
}

export default Pagination
