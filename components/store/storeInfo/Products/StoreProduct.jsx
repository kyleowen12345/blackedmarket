import React from 'react'
import { Box,Text,Icon} from "@chakra-ui/react"
import { BiSad } from "react-icons/bi"
import ProductGrid from '../../../product/ProductGrid'

const StoreProduct = ({product}) => {
    return (
        <Box  >
            {product < 1 ? <Box  height="300px" display="flex" alignItems="center" justifyContent="center" mx={[2,2,0]}>
                <Text fontWeight="bold">No Products </Text>
                <Icon as={BiSad} ml={3}  h="30px" w="30px"/>
            </Box>
            :
            <ProductGrid products={product} imageLoad={"lazy"}/>
            }
        
        </Box>
    )
}

export default StoreProduct
