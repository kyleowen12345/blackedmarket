import React from 'react'
import { useAuth } from '../../../lib/auth';
import ProductInfoImage from './ProductInfoImage';
import ProductInfoDetails from './productDetails/ProductInfoDetails';
import { Box  } from "@chakra-ui/react"
import ProductStoreInfo from './ProductStoreInfo';
const ProductInfo = ({product}) => {
    const {userData}=useAuth()
    return (
        <>
        <Box display={["block","block","flex","flex","flex"]} bg="white" height={product?.product.storeOwner.id !== userData?.id ? ["800px","750px","530px"] :["800px","750px","530px"]} ml="auto" boxShadow="md" borderRadius={5}> 
            <ProductInfoImage src={product?.product.image} alt={product?.product.productName}/>
            <ProductInfoDetails product={product} userData={userData}/>
        </Box>
        <ProductStoreInfo product={product}/>
        </>
    )
}

export default ProductInfo
