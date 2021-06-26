import React from 'react'
import { Box,Text,Grid,Button,Icon } from "@chakra-ui/react"
import Moment from 'react-moment';
import {  RiUserFollowLine} from "react-icons/ri"
const StoreDetailsGrid = ({store}) => {
    return (
        <Box ml="auto" mr="auto">
        <Grid templateColumns={ "repeat(2, 1fr)"} gridColumnGap={10}  display={["none","none","grid"]} ml="50px" height="250px"  pt={5} >
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Store Name: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.storeName}</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Store Type: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.storeType}</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}> Description: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.storeDescription}</Text>
                  </Box>
                  <Box display="flex" height="44.4px"alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}> Address: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.storeAddress}</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Social Media Account: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.socialMediaAcc}</Text>
                  </Box>
                  <Box display="flex" height="44.4px"alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}> Contact Number: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.contactNumber}</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Store Owner: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.sellerName.name}</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Store Owner's Email: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">{store?.sellerName.email}</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Followers: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px">5</Text>
                  </Box>
                  <Box display="flex" height="44.4px" alignItems="center">
                       <Text fontSize={["11px","11px","11px","13px"]}>Created: </Text> 
                       <Text fontSize={["8px","10px","11px","13px"]} fontWeight="bold" ml={3} color="#FC8E00" isTruncated  maxW="300px"><Moment format="LLL">{Date.parse(store.createdAt) || store.createdAt}</Moment></Text>
                  </Box>
               </Grid>
               <Box display="flex"  justifyContent="center" ml="50px" color="#FC8E00">
                   <Button w="100%" mt={2} borderRadius={0} border="2px solid #FC8E00" bg="transparent"  _hover={{bg:"#FC8E00", color:"white"}}><Icon as={RiUserFollowLine} mr={3} />Follow</Button>   
               </Box>
               
          </Box>     
    )
}

export default StoreDetailsGrid
