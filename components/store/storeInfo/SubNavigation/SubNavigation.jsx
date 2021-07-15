import React, { useState } from 'react'
import { Box,Image,Icon,Text } from "@chakra-ui/react"
import { AiOutlineHome,AiOutlineAppstore } from "react-icons/ai"
import { BiDetail } from "react-icons/bi"
import NextLink from 'next/link'
const SubNavigation = ({storeId}) => {
    const [inDetails,setInDetails]=useState("Home")
    return (
        <Box bg="white" borderTop="1px solid rgb(234,234,234)" display="flex" justifyContent="space-between"  alignItems="center" pt={5} height="60px" boxShadow="md">
          <NextLink href="#" passHref>
                <Box as="a" cursor="pointer" width="33.3vw"  display="flex" alignItems="center" justifyContent="center"  borderBottom={inDetails == "Home" &&  ["2px solid #FC8E00","2px solid #FC8E00","5px solid #FC8E00"]  } color={inDetails == "Home" && "#FC8E00"} height="40px" onClick={()=>setInDetails("Home")}>
                  <Icon as={AiOutlineHome} mr={[1,1,3]} />
                    <Text fontSize={["12px","12px","15px"]} fontWeight="bold">Home</Text>
                </Box> 
          </NextLink>   
          <NextLink href={`/stores/info/products?store=${storeId}&id=1&sortOrder=productName`} passHref>
                <Box as="a" cursor="pointer" width="33.3vw"  display="flex" alignItems="center" justifyContent="center"  borderBottom={inDetails == "Products" &&  ["2px solid #FC8E00","2px solid #FC8E00","5px solid #FC8E00"]  } color={inDetails == "Products" && "#FC8E00"}  height="40px" onClick={()=>setInDetails("Products")}>
                    <Icon as={AiOutlineAppstore} mr={[1,1,3]}  />
                    <Text fontSize={["12px","12px","15px"]} fontWeight="bold">Products</Text>
                </Box> 
          </NextLink>  
          <NextLink href="#details" passHref>
               <Box as="a" cursor="pointer" width="33.3vw"  display="flex" alignItems="center" justifyContent="center" borderBottom={inDetails=="Details" &&  ["2px solid #FC8E00","2px solid #FC8E00","5px solid #FC8E00"]  } color={inDetails=="Details" && "#FC8E00"} height="40px" onClick={()=>setInDetails("Details")}>
               <Icon as={BiDetail} mr={[1,1,3]}  />
                    <Text fontSize={["12px","12px","15px"]} fontWeight="bold">Store Details</Text> 
               </Box>
          </NextLink> 
            
        </Box>
    )
}

export default SubNavigation
