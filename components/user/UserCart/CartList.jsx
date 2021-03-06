import React from 'react'
import { Box,Text,Image,Link} from "@chakra-ui/react"
import NextLink from 'next/link'
import Moment from 'react-moment';
import DeleteItemInCart from './DeleteItemInCart';
import SetQuantity from './SetQuantity';
import { useCart } from '../../../lib/cart';
import EmptyList from '../../helpers/EmptyList'

const CartList = () => {
   const {data}=useCart()
    return (
        <Box display={["none","none","none","block"]}>
         {
             data?.getCartInfo.cart.length < 1 ?
              <EmptyList emptyData={"Cart is empty"}/>
             :
             data?.getCartInfo.cart.map(i=>(
                 <Box key={i.id} bg="white" my={4} boxShadow="md" borderRadius={5}>
                         <Box mx={5} pt={3}>
                               <Box display="flex" justifyContent="space-between" my={3}>
                                   <NextLink href={`/stores/info/${i.storeName}`} passHref>
                                      <Link fontSize="13px" color="messenger.400" fontWeight="bold">Visit Store</Link>
                                   </NextLink>
                                    <Text fontSize="13px" fontWeight="bold"><Moment fromNow>{Date.parse(i.date)|| i.date}</Moment></Text>
                               </Box>
                               <Box display={["block","block","flex"]} justifyContent="space-between" alignItems="center" width="100%" py={5} borderY="1px solid #EFEFEF">
                                  <Box display="flex" justifyContent={["space-between","space-between","left"]}  width={["100%","100%","80%","30%"]}>
                                       <Image src={i.image} alt={i.productName} width={["150px","150px","100px"]} height={["150px","150px","100px"]} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                                        <Box ml={5} alignItems="left" w="50%" >
                                            <Text fontSize="18px" fontWeight="bold" mb={5} isTruncated>{i.productName}</Text>
                                        </Box>
                                  </Box> 
                                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={[5,5,5,0]} width="70%">
                                     <Text w="10%" fontSize="14px" fontWeight="bold"  isTruncated>$ {i.price}</Text>
                                      <SetQuantity details={i} />
                                      <Text fontSize="14px" fontWeight="bold" align="center"  w="14%" isTruncated>$ {i.price * 0.25}</Text>
                                      <Text fontSize="14px" align="center" fontWeight="bold" color="#FC8E00" w="14%" isTruncated>$ {i.price * 0.25 +  i.price * i.quantity}</Text>
                                      <DeleteItemInCart productId={i.id} />
                                  </Box>
                            </Box>
                         </Box>
                 </Box>
             ))
         }   
        </Box>
    )
}

export default CartList
