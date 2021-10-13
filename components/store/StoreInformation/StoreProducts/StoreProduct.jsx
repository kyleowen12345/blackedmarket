import React from 'react'
import { Box} from "@chakra-ui/react"
import EmptyList from "../../../helpers/EmptyList"
import ProductGrid from '../../../product/ReusableProductComponent/ProductGrid'

const StoreProduct = ({product}) => {
    return (
        <Box  >
            {product < 1 ? 
            <EmptyList emptyData={"No products"}/>
            :
            <ProductGrid products={product} />
            }
        
        </Box>
    )
}

export default StoreProduct
