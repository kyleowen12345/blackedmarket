import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"
import SortingMenu from '../../../SortingMenu/SortingMenu'
import ProductGrid from '../../ReusableProductComponent/ProductGrid'
import EmptyList from '../../../helpers/EmptyList'
const Searched = ({sortOrder,route,products,result}) => {
    const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
    return (
        <Box width="100%">
            <SortingMenu sorterList={sorterList} sortOrder={sortOrder}  route={route}/>
            <Text py={5} textAlign="center" fontWeight="bold" fontSize="18px">Result for -  {result?.toUpperCase()}</Text>
            {products.length === 0 ? <EmptyList emptyData={`No results related to ${result}`}/>: <ProductGrid products={products}/>}
        </Box>
    )
}

export default Searched
