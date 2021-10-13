import React from 'react'
import { Box,Text,Image,Button,Link} from "@chakra-ui/react"
import { v4 as uuidv4 } from 'uuid';
import Moment from 'react-moment';
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const PurchaseList = ({history}) => {
    const router = useRouter()
    const {keyword}=router.query
    return (
        <>
        {
        history?.length < 1 ? <Box my={4} height="500px" display="flex" justifyContent="center" alignItems="center" >
            {
                keyword ? 
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="17px" > No purchase record for</Text>
                    <Text fontSize="20px" fontWeight="bold">"{keyword}"</Text>
                    <NextLink href={`/user/purchases?id=1&keyword=`} passHref={true}>
                        <Link color="messenger.400" fontWeight="bold">Go back</Link> 
                    </NextLink>
                </Box>
                :
                <Text fontSize="20px" fontWeight="bold">No purchase record</Text>
                }
        </Box>
        :
        history?.map(i=>(
            <Box key={uuidv4()} bg="white" my={4} boxShadow="md" borderRadius={5} mx={1}>

               <Box mx={5} pt={3}>
                    <Box display="flex" justifyContent="space-between" my={3}>
                        <Text fontSize="13px" fontWeight="bold"><Moment fromNow>{Date.parse(i.dateOfPurchase)||i.dateOfPurchase}</Moment></Text>
                        <Text color="#FC8E00" fontWeight="bold">Purchased</Text>
                    </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                      <Box display="flex"  width="80%">
                          <Image src={i.image} alt={i.name} width="100px" height="100px" fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                          <Box ml={10}>
                             <Text fontSize="18px" fontWeight="bold" mb={5} maxW="150px" isTruncated>{i.name}</Text>
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
