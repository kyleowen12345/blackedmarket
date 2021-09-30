import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { Box,Link } from "@chakra-ui/react"
import {useAuth} from "../../lib/auth"
import CreateProduct from '../../components/product/CreateProduct';
import { useRouter } from "next/router"
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { NextSeo } from 'next-seo';

 const ALLMYSTORES = gql`
 {
    allMyStores{
      id
      storeName
    }
  }
`;

export default function Home() {
    const {authToken,userCookie}=useAuth()
    const router = useRouter()
    const [allMyStores,{ data,error,loading }] = useLazyQuery(ALLMYSTORES,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }else{
       return allMyStores()
      }
  }, [])
 
  return (
    <>
    {
      loading ? <Loader/>
      :
      error ? <Error message={error?.message}/>
      :
      <Box mt={[0,0,0,0,0,10]}  borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]} boxShadow="md">
        {data?.allMyStores.length < 1  ? 
          <Box height={["200px","200px","400px"]} display="flex" justifyContent="center" alignItems="center"><Link fontWeight="bold" fontSize={["15px","15px","20px"]}>Please create a store first, then go back here.</Link></Box>
         : 
          <CreateProduct storeNames={data?.allMyStores}/>
        }
      </Box>
    }
     


    <NextSeo
      title={`Create Product | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/products/createProduct`}
      description="BlackedMarket lets you create products for whatever it is"
      openGraph={{
        url:`https://blackedmarket.vercel.app/products/createProduct`,
        title:`Create Product | BlackedMarket`,
        description:"BlackedMarket lets you create products for whatever it is",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `Create Product | BlackedMarket`,
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
