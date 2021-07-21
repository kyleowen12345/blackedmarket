import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import { Box} from "@chakra-ui/react"
import GetCartInfo from "../../../components/product/GetCartInfo";
import Cookies from 'js-cookie'
import Loader from '../../../components/Loader/Loader';
import Cart from '../../../components/user/Cart';
import { useCart } from '../../../lib/cart';
import { useAuth } from '../../../lib/auth';
export const CARTINFO = gql`
 query ($curPage:String!){
    getCartInfo(curPage:$curPage){
     curPage
      maxPage
      productCount
      cart{
        id
        quantity
        date
        productName
        image
        price
        storeName
        storeOwner
      }
    }
  }
`;

export default function Home() {
    const {cartinfo,loading,error,data}=useCart()
    const {authToken}=useAuth()
    const router = useRouter()
    const {id}= router.query
    useEffect(() => {
       cartinfo({variables:{curPage:id},context:{headers:{token:authToken||""}}})
    }, [id])
  return (
    < >
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>:
     <Box  mt={[0,0,0,0,10]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
     <Cart />
     </Box>}
  </>
  )
}
