import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Cookies from 'js-cookie'
import UpdateProduct from "../../../components/product/UpdateProduct";
import Loader from '../../../components/Loader/Loader';
import { Box,Text,Link,Button } from "@chakra-ui/react"
import Footer from '../../../components/Footer/Footer';
 const UPDATEPRODUCTINFO = gql`
 query ($id:ID!){
    productInfoUpdate(id:$id){
        id
        productName 
         price
         productStocks
         sold
         image
         description
         createdAt
         storeName{
           storeName
           id
         }
         storeOwner{
           id
           email
         }
  }
}
`;
const ALLMYSTORES = gql`
{
   allMyStores{
     id
     storeName
   }
 }
`;

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const [updateproductinfo,{ data,error,loading }] = useLazyQuery(UPDATEPRODUCTINFO,{variables:{id:id },context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    const [allMyStores,{ data:MyStoresData,error:MyStoresError,loading:MyStoresLoading }] = useLazyQuery(ALLMYSTORES,{context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
      if(id) {
        updateproductinfo()
        allMyStores()
      } 
      
  }, [id])

  return (
    <>
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>
    :
    <Box mt={[0,0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]} boxShadow="md">
       {data && <UpdateProduct product={data?.productInfoUpdate} storeNames={MyStoresData?.allMyStores}/>} 
      
    </Box>}
    {data && <Footer/>}
    </>
  )
}
