import React from 'react'
import { Box,Text } from "@chakra-ui/react"
import Link from 'next/link'
import DeleteProduct from '../DeleteProduct';
import AddtoCart from '../AddtoCart'
import Title from './productDetails/Title';
import Shipping from './productDetails/Shipping';
const ProductInfoDetails = ({product,decoded}) => {
    return (
        <Box ml={["auto","auto",0,0,10]} width={["300px","300px","800px"]}  mr="auto">
            {/* Title/rating/sold */}
             <Title product={product}/>
            {/* Price */}
            <Box m={3} p={[2,2,5]} bg={"rgb(250,250,250)"} >
              <Text fontSize={["15px","15px","25px"]} fontWeight="bold" color="#FC8E00" pl={4}>$ {product?.price}</Text>
            </Box>
            {/* Description */}
            <Box m={3} mt={5} display={"flex"}>
                <Box mr={[5,5,20]} width={"95px"}>
                <Text color="#888888" fontSize={["8px","12px","15px"]}>Description :</Text>
                </Box>
                <Box>
                <Text fontSize={["8px","10px","13px"]}>{product?.description}</Text>
                </Box>
                
            </Box>
            {/* Shipping */}
            <Shipping product={product}/>
            {/* Stocks */}
            <Box m={3} display={"flex"} mt={5}>
               <Box mr={[5,5,20]} width={"95px"}>
                <Text color="#888888" fontSize={["8px","12px","15px"]}>Stocks :</Text>
                </Box>
                <Box>
                <Text fontSize={["8px","10px","13px"]}>{product?.productStocks} piece(s) available</Text>
                </Box>
            </Box>
           
            {product?.storeOwner.id === decoded?.id && <Link href={`/products/updateproduct/${product.id}`}><a>Update</a></Link>}
            {product?.storeOwner.id === decoded?.id && <DeleteProduct productId={product.id} storeId={product?.storeName.id}/>} 
           {product?.storeOwner.id !== decoded?.id && <AddtoCart product={product}/>} 
        </Box>
    )
}

export default ProductInfoDetails
