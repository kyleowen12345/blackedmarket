import React from 'react'
import { Box,Link,Icon,Text } from "@chakra-ui/react";
import { AiFillGift } from "react-icons/ai"
import {  FaStore,FaProductHunt} from "react-icons/fa"
import { ChevronDownIcon} from '@chakra-ui/icons'

const BannerLink = () => {
    return (
        <Box display={"flex"} justifyContent="space-between"    mt={[0,0,4]} mb={4} bg="white" width={["100%","100%","100%","100%","100%",1200]} boxShadow="md" position="sticky" top={0} borderBottom="2px solid #FC8E00">
            <Link href="#products" _hover={{textDecoration:"none"}} width="33vw">
                <Box  p={3} pl={[0,1,3,5]}  display="flex" alignItems="center" >
                     <Icon as={FaProductHunt} color="#FC8E00" />
                     <Text fontSize={["5px","10px","12px","15px"]} fontWeight="bold" color="#FC8E00" ml={[0,1,2,3]} isTruncated>
                        New Products
                     </Text>
                    <ChevronDownIcon ml="auto" color="#FC8E00" />
                </Box>
            </Link>
            <Link href="#Store" _hover={{textDecoration:"none"}} width="33vw">
              <Box  p={3} pl={[0,1,3,5]} display="flex" alignItems="center" >
                  <Icon as={FaStore} color="#FC8E00" />
                  <Text fontSize={["5px","10px","12px","15px"]} fontWeight="bold" color="#FC8E00" ml={[0,1,2,3]}>
                    Top Stores
                  </Text>
                  <ChevronDownIcon ml="auto" color="#FC8E00" />
              </Box>
            </Link>
            <Link href="#Deals" _hover={{textDecoration:"none"}}  width="33vw">
              <Box p={3} pl={[0,1,3,5]}  pr={[0,1,3,5]} display="flex" alignItems="center">
                  <Icon as={AiFillGift} color="#FC8E00" />
                  <Text fontSize={["5px","10px","12px","15px"]}  fontWeight="bold" color="#FC8E00" ml={[0,1,2,3]}>
                    Best Seller
                  </Text>
                  <ChevronDownIcon ml="auto" color="#FC8E00" />
              </Box>
            </Link>
      </Box>
    )
}

export default BannerLink
