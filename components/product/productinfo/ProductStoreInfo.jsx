import React from 'react'
import { Box,Text,Button,Icon,Grid  } from "@chakra-ui/react"
import {  FaStore} from "react-icons/fa"
import Image from 'next/image'
import Moment from 'react-moment';
import NextLink from 'next/link'

const ProductStoreInfo = ({product}) => {
  
    return (
        <>
        <Box  display="flex" bg="white" height={["200px","100%","130px"]}  mt={3}  alignItems="center" p={[0,3,10]} flexDirection={["column","column","row"]}  > 
           <Box display="flex" borderRight={["","","","1px solid #C4C4C4"]} width={["300px","70vw","250px","250px","300px"]} >
               <Box>
                  <Image src={product.product.storeName.storeBackgroundImage} alt={product.product.storeName.storeBackgroundImage} width="70px" height="70px" className="productStore"/>
               </Box>
               
               <Box ml={5}>
                 <Text maxW={["120px","120px","200px"]} fontSize={["12px","14px","16px"]} isTruncated>{product.product.storeName.storeName}</Text>
                 <NextLink href={`/stores/info/${product.product.storeName.id}`} passHref>
                 <Box display="flex"   justifyContent="space-between" as="a">
                 <Button  width={["100px","100px","120px"]}    bg="white" color="#FC8E00" _hover={{bg:"white", color:"#FC8E00"}} border="1px solid #FC8E00" borderRadius={0} height="35px" fontSize={["11px","11px","13px"]}><Icon as={FaStore}  mr={2}/> View Shop</Button>
                 </Box>
                 </NextLink>
                 
               </Box>
            
           </Box>
          <Box display={["none","flex","flex"]} justifyContent="center" ml="auto" mr="auto" p={2}>
          <Grid templateColumns={ ["repeat(1, auto)","repeat(1, 65vw)","repeat(2, auto)","repeat(2, auto)"]} gap={5} >
               <Box display="flex" alignItems="center">
                    <Text fontSize={["11px","11px","11px","13px"]}>
                       Products
                    </Text>
                    <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                        {product.relatedProducts}
                    </Text>
               </Box>
                <Box display="flex" alignItems="center">
                    <Text fontSize={["11px","11px","11px","13px"]}>
                       Contact Number 
                    </Text>
                    <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                        {product.product.storeName.contactNumber}
                    </Text>
                </Box>
                <Box display="flex" alignItems="center">
                     <Text fontSize={["11px","11px","11px","13px"]}>
                       Joined 
                     </Text>
                     <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
                     <Moment format="LLL">{Date.parse(product.product.storeName.createdAt) || product.product.storeName.createdAt}</Moment>
                     </Text>
                </Box>
                <Box display="flex" alignItems="center">
                    <Text fontSize={["11px","11px","11px","13px"]}>
                        Store Type
                    </Text>
                    <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00">
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
