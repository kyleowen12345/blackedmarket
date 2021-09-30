import React from 'react'
import { useRouter } from "next/router"
import Pagination from '../../helpers/Pagination'
import StoreGrid from '../ReusableStoreComponets/StoreGrid'
import SortingMenu from '../../SortingMenu/SortingMenu'
const Stores = ({data}) => {
     const router = useRouter()
     const {sortOrder}= router.query
      const sorterList=[{link:"storeName",name:"Name"},{link:"storeType",name:"Type"},{link:"createdAt",name:"Latest"}]

      return (
        <>
         <SortingMenu sorterList={sorterList} sortOrder={sortOrder} route={`/stores/1?`}/>
         <StoreGrid stores={data?.storespaginate.stores} imageLoad={"lazy"}/>
         <Pagination marginPages={1} pageRange={2} initialPage={data?.storespaginate.curPage-1} pageCount={data?.storespaginate.maxPage} />
        </>
    )
}

export default Stores
