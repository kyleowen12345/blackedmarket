import React from 'react'
import { useQuery } from "@apollo/client";
import {STORES} from "../pages/index"
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"
import Image from 'next/image'

const Homepage = ({page}) => {
    const router = useRouter()
    const { data, loading,error } = useQuery( STORES,{variables:{curPage: page.toString()}} );
    const handlePagination = page => {
        const path = router.pathname
        const query = router.query
        query.page = page.selected + 1
        router.push({
          pathname: path,
          query: query,
        })
      }
    return (
        <div>
          {loading && <h1>Loading..</h1>}
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
