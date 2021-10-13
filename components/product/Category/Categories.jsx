import React from 'react'
import Pagination from '../../helpers/Pagination'
import Searched from '../ReusableProductComponent/Searched/Searched'

const Categories = ({data,category,sortOrder}) => {
    return (
        <>
          <Searched  sortOrder={sortOrder}  route={`/products/category/${category}?id=1&`} products={data?.productCategory.products} result={category}/>
          {data?.productCategory.maxPage > 1 &&<Pagination marginPages={1} pageRange={2} initialPage={data?.productCategory.curPage - 1} pageCount={data?.productCategory.maxPage} />}
        </>
    )
}

export default Categories
