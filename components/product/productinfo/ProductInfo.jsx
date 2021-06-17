import React from 'react'
import jwt_decode from "jwt-decode";
import { useAuth } from '../../../lib/auth';
import ProductInfoImage from './ProductInfoImage';
import ProductInfoDetails from './ProductInfoDetails';
import { Box  } from "@chakra-ui/react"
const ProductInfo = ({product}) => {
    const {authToken}=useAuth()
    let decoded=null
    if(authToken){
        decoded=jwt_decode(authToken)
    }
    return (
        <>
        <Box display={["block","block","flex","flex","flex"]} bg="white" height={["800px","780px","530px"]} ml="auto"> 
            <ProductInfoImage src={product?.image} alt={product?.productName}/>
            <ProductInfoDetails product={product} decoded={decoded}/>
        </Box>
        </>
    )
}

export default ProductInfo
