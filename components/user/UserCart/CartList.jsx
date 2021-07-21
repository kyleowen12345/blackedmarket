import React from 'react'
import { Box,Text,Image,Button,Link,Input} from "@chakra-ui/react"
import NextLink from 'next/link'
import Moment from 'react-moment';
import DeleteItemInCart from './DeleteItemInCart';
import SetQuantity from './SetQuantity';
import { useCart } from '../../../lib/cart';

const CartList = () => {
   const {data}=useCart()
    return (
        <>
         {
             data?.getCartInfo.cart.length < 1 ?
             <Box bg="white" my={4} height="300px" display="flex" justifyContent="center" alignItems="center" boxShadow="md" borderRadius={5}>
                  <Text fontSize="20px" fontWeight="bold">No following record</Text>
             </Box>
             :
             data?.getCartInfo.cart.map(i=>(
                 <Box key={i.id} bg="white" my={4} boxShadow="md" borderRadius={5}>
                         <Box mx={5} pt={3}>
                               <Box display="flex" justifyContent="space-between" my={3}>
                                   <NextLink href={`/stores/info/${i.storeName}`} passHref>
                                      <Link fontSize="13px" fontWeight="bold">Visit Store</Link>
                                   </NextLink>
                                    <Text fontSize="13px" fontWeight="bold"><Moment fromNow>{Date.parse(i.date)|| i.date}</Moment></Text>
                               </Box>
                               <Box display={["block","block","flex"]} justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                                  <Box display="flex" justifyContent={["space-between","space-between","left"]}  width={["100%","100%","80%","30%"]}>
                                       <Image src={i.image} alt={i.productName} width={["150px","150px","100px"]} height={["150px","150px","100px"]}/>
                                        <Box ml={10} alignItems="left" w="50%">
                                            <Text fontSize="18px" fontWeight="bold" mb={5}>{i.productName}</Text>
                                        </Box>
                                  </Box> 
                                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={[5,5,5,0]} width="70%">
                                     <Text w="10%" fontSize="14px" fontWeight="bold" >$ {i.price}</Text>
                                      <SetQuantity details={i} />
                                      <Text fontSize="14px" fontWeight="bold"  w="14%">$ {i.price * 0.25}</Text>
                                      <Text fontSize="14px" fontWeight="bold" color="#FC8E00" w="14%">$ {i.price * 0.25 +  i.price * i.quantity}</Text>
                                      <DeleteItemInCart productId={i.id} />
                                  </Box>
                            </Box>
                         </Box>
                 </Box>
             ))
         }   
        </>
    )
}

export default CartList
