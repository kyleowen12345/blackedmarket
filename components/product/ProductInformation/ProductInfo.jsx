import React from 'react'
import { useAuth } from '../../../lib/auth';
import ProductInfoImage from './ProductDetails/ProductInfoImage';
import ProductInfoDetails from './ProductDetails/ProductInfoDetails';
import { Box  } from "@chakra-ui/react"
import ProductStoreInfo from './StoreDetails/ProductStoreInfo';
const ProductInfo = ({product,refetch}) => {
    const {userData}=useAuth()
    return (
        <>
        <Box display={["block","block","flex"]} bg="white" height={["800px","780px","530px"]} m={[1,2,0]} boxShadow="md" borderRadius={5}> 
            <ProductInfoImage src={product?.product.image} alt={product?.product.productName}/>
            <ProductInfoDetails product={product} userData={userData} refetch={refetch}/>
        </Box>
           <ProductStoreInfo product={product}/>
        </>
    )
}

export default ProductInfo
