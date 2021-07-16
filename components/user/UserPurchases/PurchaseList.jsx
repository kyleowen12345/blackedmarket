import React from 'react'
import { Box,Text,Image,Button} from "@chakra-ui/react"
import { v4 as uuidv4 } from 'uuid';
import Moment from 'react-moment';
import NextLink from 'next/link'
const PurchaseList = ({history}) => {
    return (
        <>
        {
        history?.length < 1 ? <Box bg="white" my={4} height="100%" display="flex" justifyContent="center" alignItems="center" boxShadow="md" borderRadius={5}>
            <Text fontSize="20px" fontWeight="bold">No orders yet</Text>
        </Box>
        :
        history?.map(i=>(
            <Box key={uuidv4()} bg="white" my={4} boxShadow="md" borderRadius={5}>

               <Box mx={5} pt={3}>
                    <Box display="flex" justifyContent="space-between" my={3}>
                        <Text fontSize="13px" fontWeight="bold"><Moment fromNow>{Date.parse(i.dateOfPurchase)||i.dateOfPurchase}</Moment></Text>
                        <Text color="#FC8E00" fontWeight="bold">Purchased</Text>
                    </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                      <Box display="flex"  width="80%">
                          <Image src={i.image} alt={i.name} width="100px" height="100px"/>
                          <Box ml={10}>
                             <Text fontSize="18px" fontWeight="bold" mb={5}>{i.name}</Text>
                             <Text>x{i.quantity}</Text> 
                          </Box>
                      </Box> 
                   <Box>
                       <Text>${i.price}</Text>
                   </Box>
                </Box>
                
               </Box>


               <Box px={5} py={2} display="flex" justifyContent="space-between" bg="#FFFEFB">
                  <Box>
                  </Box>
                   <Box display="flex" alignItems="center">
                      <Text fontSize="14px">Order Total:</Text>
                      <Text fontSize="20px" color="#FC8E00" fontWeight="bold" ml={5}>${(i.price * i.quantity) + (i.price * 0.25)}</Text>
                   </Box>
               </Box>


               <Box px={5} pt={2} pb={4} display="flex" justifyContent="space-between"  bg="#FFFEFB">
                  <Box>
                  </Box>
                   <Box display="flex" alignItems="center">
                      <NextLink href={`/products/info/${i.id}`} passHref>
                        <Button as="a"  fontSize="14px" bg="#FC8E00" color="white" _hover={{bg:"#FC8E00"}}>Buy Again</Button>
                      </NextLink> 
                      <NextLink href={`/stores/info/${i.storeName}`} passHref> 
                          <Button as="a" fontSize="14px" ml={5} bg="white" border="1px solid gray" color="gray" _hover={{bg:"white"}}>Visit Store</Button>
                      </NextLink> 
                   </Box>
               </Box>
                
            </Box>
        ))}
        
        </>
    )
}

export default PurchaseList
