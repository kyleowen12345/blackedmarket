import React, {useEffect} from 'react'
import { Box} from "@chakra-ui/react"
import Loader from '../../components/Loader/Loader';
import Cart from '../../components/user/Cart';
import { useCart } from '../../lib/cart';
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
import Error from '../../components/Error/Error'


export default function Home() {
    const router = useRouter()
    const {data,loading,error}=useCart()
    const {userCookie}=useAuth()
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }
      
}, [userCookie])
  return (
    <>
    {loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/> 
    :
     <Box  mt={[0,0,0,0,5]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
         {data && <Cart />}
     </Box>}
     
  </>
  )
}