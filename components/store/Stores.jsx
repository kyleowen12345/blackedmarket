import React from 'react'
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"
import Image from 'next/image'
import Link from 'next/link'

const Homepage = ({data,loading}) => {
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
        {loading && <h1>Loading..</h1>}
    <Link href="/user/profile"><a>Profile</a></Link>
    <h1>Stores</h1>
        {
          data?.storespaginate.stores.map(i=>(
          <div key={i.id}>
       <Image
        src={i.storeBackgroundImage}
        alt={i.storeName}
        width={500}
        height={500}
      />
         <p>{i.storeName}</p>
         <p>{i.sellerName.email}</p>
       </div> 
             ))
          }
        <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        initialPage={data?.storespaginate.curPage - 1}
        pageCount={data?.storespaginate.maxPage}
        onPageChange={handlePagination}
      />
        </div>
    )
}

export default Homepage
