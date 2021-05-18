import React from 'react'
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"
import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import Moment from 'react-moment';
const Purchases = ({history}) => {
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
        <div>
        <Link href="/user/profile"><a>Profile</a></Link>
            {
              history?.history.map(i=>(
              <div key={uuidv4()}>
           <Image
            src={i.image}
            alt={i.name}
            width={500}
            height={500}
          />
             <p>{i.name}</p>
             <p>{i.price}</p>
             <p>{i.quantity}</p>
             <p><Moment format="LLLL">{i.dateOfPurchase}</Moment></p>
             <Link href={`/products/info/${i.id}`}><a>Visit</a></Link>
           </div> 
                 ))
              }
            <ReactPaginate
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            initialPage={history?.curPage - 1}
            pageCount={history?.maxPage}
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
          />
            </div>
    )
}

export default Purchases
