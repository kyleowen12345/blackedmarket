import React from 'react'
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"
import Image from 'next/image'
import Link from 'next/link'
const Products = ({data}) => {
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
    <h1>Products</h1>
        {
          data?.products.map(i=>(
          <div key={i.id}>
       <Image
        src={i.image}
        alt={i.productName}
        width={500}
        height={500}
      />
         <p>{i.productName}</p>
         <p>{i.price}</p>
         <p>{i.description}</p>
         <p>{i.storeName.storeName}</p>
         <p>{i.storeOwner.email}</p>
         <Link href={`/products/info/${i.id}`}><a>Visit</a></Link>
       </div> 
             ))
          }
        <ReactPaginate
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        initialPage={data?.curPage - 1}
        pageCount={data?.maxPage}
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

export default Products
