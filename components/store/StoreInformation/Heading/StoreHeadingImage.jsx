import React from 'react'
import { Box,Image,Text,Button,Icon,Link } from "@chakra-ui/react"
import { AiOutlineMail } from "react-icons/ai"
import { useAuth } from '../../../../lib/auth'
import { AiOutlineEdit } from "react-icons/ai"
import DeleteModal from './withuser/DeleteModal'
import NextLink from 'next/link'
import Follow from './WithoutUser/Follow'

const StoreHeadingImage = ({store,follower}) => {
    const {userData}=useAuth()
    
    return (
     <Box position="relative" width="24.37rem" overflow="hidden" borderRadius={["0","0","0",".25rem"]} height={"150px"} width={["100%","100%","100%","390px"]} >
            <Box position="absolute" left={0} top={0} right={0} bottom={0} backgroundImage={`url(${store.storeBackgroundImage})`} backgroundPosition="50%" backgroundSize="cover" backgroundRepeat="no-repeat" filter="blur(2px)" m={-4}></Box>
            <Box position="absolute" left={0} top={0} right={0} bottom={0} backgroundColor="rgba(0,0,0,.6)"></Box>
            <Box position="absolute" left={"1.25rem"} top={".625rem"} right={".875rem"} bottom={".625rem"} >
                <Box display="flex">
                   <Box position="relative" height="5rem" width="5rem" flexShrink={0}>
                       <Image src={store.storeBackgroundImage} alt={store.storeName} width="75px" height="75px" borderRadius="50%" border="2px solid white" fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                   </Box>
                   <Box mt={".625rem"} ml={".625rem"} color="white" position="relative" overflow="hidden">
                       <Text fontWeight="bold" fontSize="20px" isTruncated  maxW="220px">{store.storeName}</Text>
                       <Text fontSize="12px">Active</Text>
                   </Box>
                </Box>
                {/* To identify if you are the owner of the store */}
                {
                store?.sellerName.id == userData?.id ? 
                <Box position="relative" display="flex" mt=".625rem">
                    <Box pr=".625rem" flex={1} >
                    <NextLink href={`/stores/updatestore/${store.id}`} passHref>
                        <Button bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}} ><Icon as={AiOutlineEdit} mr={3} /> Update</Button>
                    </NextLink>
                    </Box>
                    <Box pr=".625rem" flex={1}>
                        <DeleteModal store={store}/>
                    </Box>
                </Box>
                :
                <Box position="relative" display="flex" mt=".625rem">
                    <Follow store={store} follower={follower}/>
                    <Box pr=".625rem" flex={1}>
                    <Link href={`mailto:${store.sellerName.email}`} _hover={{textDecoration:"none"}} >  
                        <Button  bg="transparent" fontSize="14px" borderRadius="none" color="white" border="1px solid white" width="100%" _hover={{bg:"transparent"}}><Icon as={AiOutlineMail} mr={3} /> Mail</Button>
                    </Link>
                    </Box>
                </Box>
                }
                
           </Box>
    </Box>
       
    )
}

export default StoreHeadingImage
