import React from 'react'
import jwt_decode from "jwt-decode";
import { useAuth } from '../../../lib/auth';
import ProductInfoImage from './ProductInfoImage';
import ProductInfoDetails from './productDetails/ProductInfoDetails';
import { Box  } from "@chakra-ui/react"
import ProductStoreInfo from './ProductStoreInfo';
const ProductInfo = ({product}) => {
    const {authToken}=useAuth()
    let decoded=null
    if(authToken){
        decoded=jwt_decode(authToken)
    }
    return (
        <>
        <Box display={["block","block","flex","flex","flex"]} bg="white" height={product?.product.storeOwner.id !== decoded?.id ? ["800px","750px","530px"] :["800px","640px","450px"]} ml="auto"> 
            <ProductInfoImage src={product?.product.image} alt={product?.product.productName}/>
            <ProductInfoDetails product={product} decoded={decoded}/>
        </Box>
        <ProductStoreInfo product={product}/>
        </>
    )
}

export default ProductInfo
