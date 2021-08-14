import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";;
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import { Box} from "@chakra-ui/react"
import { useAuth } from '../../../lib/auth';
import { STORESINFO } from '../info/[id]';
import { NextSeo } from 'next-seo';

import UpdateStore from "../../../components/store/UpdateStore";
import Loader from '../../../components/Loader/Loader';
import Footer from '../../../components/Footer/Footer';
import Error from '../../../components/Error/Error';

export const UPDATESTOREINFO = gql`
 query ($id:ID!){
    storeInfoUpdate(id:$id){
    id
    storeName
    storeAddress
    storeDescription
    storeType
    socialMediaAcc
    contactNumber
    storeBackgroundImage
  }
}
`;

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const {userCookie}=useAuth()
    const [storesInfo,{ data,error,loading }] = useLazyQuery(STORESINFO,{variables:{id:id }});
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }else{
        return storesInfo()
      }
      
  }, [])
  return (
    <>
     {
     loading ? <Loader/> 
     :
     error ? <Error message={error?.message}/>
     :
     <Box mt={[0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}  boxShadow="md">
       {data && <UpdateStore store={data?.storeInfo.store} id={id}/>}
    </Box>
     }

     {data && <Footer/>}

     <NextSeo
      title={`Store Update | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/stores/updatestore/${id}`}
      description="BlackedMarket's store update helps you improve the quality of your service"
      openGraph={{
        url:`https://blackedmarket.vercel.app/stores/updatestore/${id}`,
        title:`Store Update | BlackedMarket`,
        description:"BlackedMarket's store update helps you improve the quality of your service",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `Store Update | BlackedMarket `,
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
