import React from 'react'
import { Box,Text,Button,Icon } from "@chakra-ui/react"
import Link from 'next/link'
import DeleteProduct from '../../DeleteProduct';
import AddtoCart from '../../AddtoCart'
import Title from './Title';
import Shipping from './Shipping';
import { AiOutlineEdit } from "react-icons/ai"
import Moment from 'react-moment';
const ProductInfoDetails = ({product,decoded}) => {
    
    return (
        <Box ml={["auto","auto",0,0,10]} width={["300px","300px","800px"]}  mr="auto">
            {/* Title/rating/sold */}
             <Title product={product.product}/>
            {/* Price */}
            <Box m={3} p={[2,2,5]} bg={"rgb(250,250,250)"} >
              <Text fontSize={["15px","15px","25px"]} fontWeight="bold" color="#FC8E00" pl={4}>$ {product?.product.price}</Text>
            </Box>
            {/* Description */}
            <Box m={3} mt={5} display={"flex"} alignItems="center">
                <Box mr={[5,5,20]} width={"95px"}>
                <Text color="#888888" fontSize={["8px","13px","15px"]}>Description </Text>
                </Box>
                <Box maxW={["150px","150px","200px"]} isTruncated>
                <Text fontSize={["8px","11px","13px"]} isTruncated>{product?.product.description}</Text>
                </Box>
                
            </Box>
            {/* Shipping */}
           {product?.product.storeOwner.id !== decoded?.id && <Shipping product={product.product}/>}
            {/* Stocks */}
            <Box m={3} display={"flex"} mt={5}>
               <Box mr={[5,5,20]} width={"95px"}>
                <Text color="#888888" fontSize={["8px","13px","15px"]}>Stocks </Text>
                </Box>
                <Box>
                <Text fontSize={["8px","11px","13px"]}>{product?.product.productStocks} piece(s) available</Text>
                </Box>
            </Box>
            {/* Created */}
           {product?.product.storeOwner.id === decoded?.id && <Box m={3} display={"flex"} mt={5}>
               <Box mr={[5,5,20]} width={"95px"}>
                   <Text color="#888888" fontSize={["8px","13px","15px"]}>Created</Text>
                </Box>
                <Box>
                   <Text fontSize={["8px","11px","13px"]}><Moment format="LLL">{Date.parse(product.product.createdAt) || product.product.createdAt}</Moment></Text>
                </Box>
            </Box>}
            {product?.product.storeOwner.id === decoded?.id && <Box display={"flex"} width={["300px","300px","400px"]} justifyContent="space-between" m={3} mt={5}>
            <Link href={`/products/updateproduct/${product.product.id}`} passHref>
                <Button fontSize={["13px","13px","18px"]} width={["120px","120px","180px"]} bg="#E4E6EB" color="black" borderRadius={0} ><Icon as={AiOutlineEdit} color="black" mr={2}/>Update</Button>
            </Link>
            <DeleteProduct productId={product.product.id} storeId={product?.product.storeName.id} productName={product?.product.productName}/>
            </Box>
            }
            {/* {product?.product.storeOwner.id === decoded?.id && }  */}
           {product?.product.storeOwner.id !== decoded?.id && <AddtoCart product={product.product}/>} 
        </Box>
    )
}

export default ProductInfoDetails
