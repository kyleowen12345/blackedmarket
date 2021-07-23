import React from 'react'
import { Box} from "@chakra-ui/react"
import Loader from '../../components/Loader/Loader';
import Cart from '../../components/user/Cart';
import { useCart } from '../../lib/cart';



export default function Home() {
    const {loading,error}=useCart()
  
  return (
    < >
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>:
     <Box  mt={[0,0,0,0,10]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
     <Cart />
     </Box>}
  </>
  )
}