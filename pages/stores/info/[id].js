import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import StoreInfo from "../../../components/store/StoreInformation/Index";
import { Box } from "@chakra-ui/react"
import Loader from '../../../components/Loader/Loader';
import { useAuth } from '../../../lib/auth';
import Footer from '../../../components/Footer/Footer';
import Error from '../../../components/Error/Error';
import { NextSeo } from 'next-seo';

export const STORESINFO = gql`
 query ($id:ID!){
    storeInfo(id:$id){
      store{
        id
        storeName
        storeAddress
        storeDescription
        storeType
        sellerName{
          id
          email
          name
        }
        socialMediaAcc
        contactNumber
        createdAt
        storeBackgroundImage
      }
      products{
        id
        productName
        price
        image
        sold
      }
      isUserAFollower
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {authToken}=useAuth()
  const {id}= router.query
  const [storesinfo,{ data, error,loading }] = useLazyQuery( STORESINFO,{variables:{id:id },context:{headers:{token:authToken || ""}}} );
  useEffect(() => {
    if(id){
      return storesinfo()
    }else{
      return
    }
    
  }, [id])
  return (
    < >
      {loading ? <Loader/> 
      : 
      error ? <Error message={error?.message}/>
      :
       <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   >
       {data && <StoreInfo store={data?.storeInfo.store} product={data?.storeInfo.products} follower={data?.storeInfo.isUserAFollower}/>}
       </Box>}

       {data && <Footer/>}
         

       <NextSeo
       title={!data ? 'Store Information | BlackedMarket':`${data?.storeInfo.store.storeName} | BlackedMarket`} 
       canonical={`https://blackedmarket.vercel.app/stores/info/${id}`}
       description="BlackedMarket store information page shows the complete details about the store." 
      openGraph={{
      url:`https://blackedmarket.vercel.app/stores/info/${id}`,
      title:'Store Information | BlackedMarket',
      description:"BlackedMarket store information page shows the complete details about the store",
      images:[
        {
          url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
          width: 200,
          height: 200,
          alt: 'Store Information | BlackedMarket',
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