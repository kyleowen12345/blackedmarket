import React from 'react'
import Searched from '../ReusableProductComponent/Searched/Searched'
import Pagination from '../../helpers/Pagination'


const Searches = ({data,search,sortOrder}) => {
    return (
        <>
           <Searched  sortOrder={sortOrder}  route={`/products/search/${search}?id=1&`} products={data?.searchProduct.products} result={search}/>
           {data?.searchProduct.maxPage > 1 && <Pagination marginPages={1} pageRange={2} initialPage={data?.searchProduct.curPage - 1} pageCount={data?.searchProduct.maxPage} />}
            
        </>
    )
}

export default Searches
