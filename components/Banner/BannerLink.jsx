import React from 'react'
import { Box,Link,Icon,Badge } from "@chakra-ui/react";
import { AiFillGift } from "react-icons/ai"
import {  FaStore,FaProductHunt} from "react-icons/fa"
import { ChevronDownIcon} from '@chakra-ui/icons'

const BannerLink = () => {
    return (
        <Box display={"flex"} justifyContent="space-between"   mt={4} mb={4}>
            <Link href="#products" >
                <Box bg="white" w={["100px","100px","150px","230px","230px","380px"]} p={2} pl={[0,1,3,5]} borderRadius={"3xl"} display="flex" alignItems="center" _hover={{border: "3px solid rgb(254,189,105)"}}>
                  <Icon as={FaProductHunt} color="#FEBD69" />
                   <Badge fontSize={["5px","10px","12px","15px"]}  colorScheme="orange" ml={[0,1,2,3]} isTruncated>
                     New Products
                    </Badge>
                    <ChevronDownIcon ml="auto" color="#FEBD69" />
                </Box>
            </Link>
            <Link href="#Store" >
            <Box bg="white" w={["100px","100px","150px","200px","230px","380px"]} p={2} pl={[0,1,3,5]} borderRadius={"3xl"} display="flex" alignItems="center" _hover={{border: "3px solid rgb(254,189,105)"}}>
            <Icon as={FaStore} color="#FEBD69" />
                  <Badge fontSize={["5px","10px","12px","15px"]}    colorScheme="orange" ml={[0,1,2,3]}>
                    Top Store
                  </Badge>
                  <ChevronDownIcon ml="auto" color="#FEBD69" />
                </Box>
            </Link>
            <Link href="#Deals" >
            <Box bg="white" w={["100px","100px","150px","200px","230px","380px"]}p={2} pl={[0,1,3,5]} borderRadius={"3xl"} display="flex" alignItems="center" _hover={{border: "3px solid rgb(254,189,105)"}}>
            <Icon as={AiFillGift} color="#FEBD69" />
                  <Badge fontSize={["5px","10px","12px","15px"]}    colorScheme="orange" ml={[0,1,2,3]}>
                     Deals
                  </Badge>
                  <ChevronDownIcon ml="auto" color="#FEBD69" />
                </Box>
            </Link>
      </Box>
    )
}

export default BannerLink
