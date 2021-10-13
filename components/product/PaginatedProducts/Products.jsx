import React from 'react'
import { useRouter } from "next/router"
import Pagination from '../../helpers/Pagination'
import SortingMenu from '../../SortingMenu/SortingMenu'
import ProductGrid from '../ReusableProductComponent/ProductGrid'

const Products = ({data}) => {
    const router = useRouter()
    const {sortOrder}= router.query
    const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
    return (
        <>
       <SortingMenu sorterList={sorterList} sortOrder={sortOrder} route={`/products/1?`}/>
       <ProductGrid  products={data?.productpaginate.products} /> 
       <Pagination marginPages={1} pageRange={2} initialPage={data?.productpaginate.curPage - 1} pageCount={data?.productpaginate.maxPage}/>   
        </>
    )
}

export default Products
