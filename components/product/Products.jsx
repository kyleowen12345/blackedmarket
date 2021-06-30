import React from 'react'
import { useRouter } from "next/router"
import Pagination from '../helpers/Pagination'
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
         {data?.productCount > 5 && <Pagination marginPages={1} pageRange={2} initialPage={data?.curPage - 1} pageCount={data?.maxPage} onPageChange={handlePagination}/>}
        </div>
    )
}

export default Products
