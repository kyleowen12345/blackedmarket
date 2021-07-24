import React from 'react'
import { Box,Text,Image,Link,Stack} from "@chakra-ui/react"
import NextLink from 'next/link'
import Moment from 'react-moment';
import DeleteItemInCart from './DeleteItemInCart';
import SetQuantity from './SetQuantity';
import { useCart } from '../../../lib/cart';

const SmallCartList = () => {
    const {data}=useCart()
    return (
        <Box display={["block","block","block","none"]}>
        {
            data?.getCartInfo.cart.length < 1 ?
            <Box bg="white" my={4} height="300px" display="flex" justifyContent="center" alignItems="center" boxShadow="md" borderRadius={5}>
                 <Text fontSize="20px" fontWeight="bold">No following record</Text>
            </Box>
            :
            data?.getCartInfo.cart.map(i=>(
                <Box key={i.id} bg="white" my={4} mx={1} boxShadow="md" borderRadius={5}>
                        <Box mx={5} >
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                  <Text fontSize="13px" fontWeight="bold"><Moment fromNow>{Date.parse(i.date)|| i.date}</Moment></Text>
                                  <DeleteItemInCart productId={i.id} />
                              </Box>
                              <Box display={["block","block","flex"]} justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                                 <Box display="flex" justifyContent={["space-between","space-between","left"]}  width={["100%","100%","100%","30%"]} alignItems="center">
                                      <Image src={i.image} alt={i.productName} width={["130px","130px","150px"]} height={["130px","130px","150px"]}/>
                                       <Box ml={[5,5,10]}  w="50%">
                                           <Stack spacing={3}>
                                              <Text fontSize="14px" fontWeight="bold" isTruncated>{i.productName}</Text>
                                              <Text fontSize="12px" fontWeight="bold" isTruncated>Price: $ {i.price}</Text>
                                              <Text fontSize="12px" fontWeight="bold" color="#FC8E00" isTruncated>Shipping: $ {i.price * 0.25}</Text>
                                              <Text fontSize="12px"  fontWeight="bold"  isTruncated>Total: $ {i.price * 0.25 +  i.price * i.quantity}</Text>
                                              <SetQuantity details={i} />
                                           </Stack>
                                       </Box>
                                 </Box> 
                              </Box>
                        </Box>
                </Box>
            ))
        }   
       </Box>
    )
}

export default SmallCartList
