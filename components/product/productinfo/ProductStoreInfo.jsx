import React from 'react'
import { Box,Text,Button,Icon,Grid  } from "@chakra-ui/react"
import {  FaStore} from "react-icons/fa"
import Image from 'next/image'
import Moment from 'react-moment';

const ProductStoreInfo = ({product}) => {
    console.log( product)
    return (
        <>
        <Box  display={["block","block","block","flex","flex",]} bg="white" height={["200px","250px","100px"]} mt={10}    alignItems="center" p={[0,3,10]} > 
           <Box display="flex" borderRight={["","","","1px solid #C4C4C4"]} width={["300px","300px","300px","400px"]} ml={["auto","auto","0px"]}>
               <Box>
                  <Image src={product.product.storeName.storeBackgroundImage} alt={product.product.storeName.storeBackgroundImage} width="70px" height="70px" className="productStore"/>
               </Box>
               
               <Box ml={5}>
                 <Text>{product.product.storeName.storeName}</Text>
                 <Box display="flex"   justifyContent="space-between" >
                 <Button as="a" width="120px"  bg="white" color="#888888"  _hover={{bg:"#FC8E00",color:"white"}} border="1px solid #C4C4C4" borderRadius={0} height="35px" fontSize="13px"><Icon as={FaStore}  mr={2}/> View Shop</Button>
                 </Box>
               </Box>
            
           </Box>
          <Box display="flex" justifyContent="center" ml="auto" mr="auto">
          <Grid templateColumns={ ["repeat(1, auto)","repeat(1, auto)","repeat(2, auto)"]} gap={5}   p={2}>
               <Box display="flex" alignItems="center">
                    <Text fontSize={"13px"}>
                       Products :
                    </Text>
                    <Text fontSize={["8px","10px","13px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                        {product.relatedProducts}
                    </Text>
               </Box>
                <Box display="flex" alignItems="center">
                    <Text fontSize="13px">
                       Contact Number : 
                    </Text>
                    <Text fontSize={["8px","10px","13px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                        {product.product.storeName.contactNumber}
                    </Text>
                </Box>
                <Box display="flex" alignItems="center">
                     <Text fontSize="13px">
                       Joined : 
                     </Text>
                     <Text fontSize={["8px","10px","13px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                     <Moment format="LLL">{Date.parse(product.product.storeName.createdAt) || product.product.storeName.createdAt}</Moment>
                     </Text>
                </Box>
                <Box display="flex" alignItems="center">
                    <Text fontSize="13px">
                        Store Type : 
                    </Text>
                    <Text fontSize={["8px","10px","13px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                        {product.product.storeName.storeType}
                    </Text>
                </Box>
                
            </Grid>  
        </Box> 
           
        </Box>
        </>
    )
}

export default ProductStoreInfo
