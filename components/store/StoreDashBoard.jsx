import React from 'react'
import { useRouter } from "next/router"
import Image from 'next/image'
import Link from 'next/link'
import Pagination from '../helpers/Pagination'

const StoreDashBoard = ({mystore}) => {
    const router = useRouter()
    console.log(mystore)
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
            {
             mystore?.stores.map(i=>(
            <div key={i.id}>
           <Image src={i.storeBackgroundImage} alt={i.storeName} width={300} height={300}/>
             <p>{i.storeName}</p>
             <p>{i.storeType}</p>
             <Link href={`/stores/info/${i.id}`}><a>Visit</a></Link>
           </div> 
             ))   
            }
            <Pagination marginPages={3} pageRange={3} initialPage={mystore?.curPage - 1} pageCount={mystore?.maxPage} onPageChange={handlePagination}/>
        </div>
    )
}

export default StoreDashBoard
