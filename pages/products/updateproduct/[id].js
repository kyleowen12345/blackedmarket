import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import UpdateProduct from "../../../components/product/UpdateProduct/UpdateProduct";
import Loader from '../../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import { useAuth } from '../../../lib/auth';
import Error from '../../../components/Error/Error';
import { NextSeo } from 'next-seo';
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
   const {authToken,userCookie,userData}=useAuth()
    const router = useRouter()
    const {id}= router.query
    const [updateproductinfo,{ data,error,loading }] = useLazyQuery(UPDATEPRODUCTINFO,{variables:{id:id },context:{headers:{token:authToken||""}}});
    const [allMyStores,{ data:MyStoresData,error:MyStoresError,loading:MyStoresLoading }] = useLazyQuery(ALLMYSTORES,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      if(!userCookie && !userData){
        return router.push('/login')
      }
      if(id){
        updateproductinfo()
        allMyStores()
      } 
      
  }, [id,userCookie,userData])

  return (
    <>
    {
    loading ? <Loader/> 
    : 
    error ?<Error message={error?.message}/>
    :
    <Box mt={[0,0,6,7,8,10]} borderRadius={5} bg="white" width={["100%","100%","95%","95%","95%",1200]} mr="auto" ml="auto"  p={[3,2,0]} boxShadow="md">
       {data && <UpdateProduct product={data?.productInfoUpdate} storeNames={MyStoresData?.allMyStores}/>} 
      
    </Box>}


    {
      data &&
      <Box display={["none","none","none","block"]}>
        <Footer/>
      </Box>
    }
    
    
    <NextSeo
      title={`Product Update | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/products/updateproduct/${id}`}
      description="BlackedMarket's product update helps you improve the quality of your service"
      openGraph={{
        url:`https://blackedmarket.vercel.app/products/updateproduct/${id}`,
        title:`Product Update | BlackedMarket`,
        description:"BlackedMarket's product update helps you improve the quality of your service",
        images:[
          {
            url: 'https://res.cloudinary.com/kaking/image/upload/v1628831176/createproducts_vyrooh.png',
            width: 200,
            height: 200,
            alt: `Product Update | BlackedMarket`,
          }
              ]
      }}
      twitter={{
      site:'BlackedMarket',
      cardType:'summary_large_image',
      handle:'Kyle Owen Ga'
      }}>
     </NextSeo>
    </>
  )
}
