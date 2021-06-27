import React from 'react'
import { Box,Image,Text,Button,Icon } from "@chakra-ui/react"
import { AiOutlineMail } from "react-icons/ai"
import {  RiUserFollowLine} from "react-icons/ri"

const StoreHeadingImage = ({store}) => {
    return (
     <Box position="relative" width="24.37rem" overflow="hidden" borderRadius=".25rem" height={"150px"} width={["100%","100%","100%","390px"]} >
            <Box position="absolute" left={0} top={0} right={0} bottom={0} backgroundImage={`url(${store.storeBackgroundImage})`} backgroundPosition="50%" backgroundSize="cover" backgroundRepeat="no-repeat" filter="blur(2px)" m={-4}></Box>
            <Box position="absolute" left={0} top={0} right={0} bottom={0} backgroundColor="rgba(0,0,0,.6)"></Box>
            <Box position="absolute" left={"1.25rem"} top={".625rem"} right={".875rem"} bottom={".625rem"} >
                <Box display="flex">
                   <Box position="relative" height="5rem" width="5rem" flexShrink={0}>
                       <Image src={store.storeBackgroundImage} alt={store.storeName} width="75px" height="75px" borderRadius="50%" border="2px solid white"/>
                   </Box>
                   <Box mt={".625rem"} ml={".625rem"} color="white" position="relative" overflow="hidden">
                       <Text fontWeight="bold" fontSize="20px" isTruncated  maxW="220px">{store.storeName}</Text>
                       <Text fontSize="12px">Active</Text>
                   </Box>
                </Box>
            
                <Box position="relative" display="flex" mt=".625rem">
                    <Box pr=".625rem" flex={1} >
                        <Button bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}}><Icon as={RiUserFollowLine} mr={3} /> Follow</Button>
                    </Box>
                    <Box pr=".625rem" flex={1}>
                        <Button bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}}><Icon as={AiOutlineMail} mr={3} /> Mail</Button>
                    </Box>
                </Box>
           </Box>
    </Box>
       
    )
}

export default StoreHeadingImage
