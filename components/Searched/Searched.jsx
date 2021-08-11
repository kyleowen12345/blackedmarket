import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"
import SortingMenu from '../SortingMenu/SortingMenu'
import ProductGrid from '../product/ProductGrid'
import EmptySearch from './EmptySearch'
const Searched = ({sorterList,sortOrder,route,products,result}) => {
    return (
        <Box width="100%">
            <SortingMenu sorterList={sorterList} sortOrder={sortOrder}  route={route}/>
            <Text py={5} textAlign="center" fontWeight="bold" fontSize="18px">result for -  {result?.toUpperCase()}</Text>
            {products.length === 0 ? <EmptySearch result={result}/>: <ProductGrid products={products}/>}
        </Box>
    )
}

export default Searched
