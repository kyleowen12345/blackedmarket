import React from 'react'
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"
const Pagination = ({marginPages,pageRange,initialPage,pageCount}) => {
  const router = useRouter()
    const handlePagination = id => {
        const path = router.pathname
        const query = router.query
        query.id = id.selected + 1
        router.push({
          pathname: path,
          query: query,
        })
      }
    return (
        
        <ReactPaginate
            marginPagesDisplayed={marginPages}
            pageRangeDisplayed={pageRange}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            initialPage={initialPage}
            pageCount={pageCount}
            onPageChange={handlePagination}
            containerClassName={"paginate-wrap"}
            subContainerClassName={"paginate-inner"}
            pageClassName={"paginate-li"}
            pageLinkClassName={"paginate-a"}
            activeClassName={"paginate-active"}
            previousClassName={"paginate-previous"}
            nextClassName={"paginate-next"}
            breakLinkClassName={"paginate-break-a"}
            breakClassName={"paginate-previous"}
            disableInitialCallback={ true }
          />
          
    )
}

export default Pagination
