import React from 'react'
import { Box,Text,Link,Button } from "@chakra-ui/react"
import ProductCount from './ProductCount'
import ProductStats from './ProductStats'
const ProductDashBoard = ({data}) => {
    return (
        <Box width="100%" display={["","","","flex"]} height={["500px","500px","500px","300px"]} my={[5,5,5,10]}>
            <ProductCount data={data}/>
            <ProductStats data={data}/>
        </Box>
    )
}

export default ProductDashBoard
