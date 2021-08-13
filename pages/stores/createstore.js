import React, {useEffect} from 'react'
import { useLazyQuery  } from "@apollo/client";
import CreateStore from '../../components/store/CreateStore'
import { Box } from "@chakra-ui/react"
import {PROFILE} from '../user/profile'
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';
import { NextSeo } from 'next-seo';

export default function createStore() {
   const {authToken,userCookie}=useAuth()
   const router = useRouter()
   const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }else{
        return profile()
      }
  }, [])
  console.log(data)
  console.log(error)
  console.log(loading)
    return (
      <>
      {
      loading ? <Loader/> 
      : 
      error ? <Error message={error?.message}/>
      :
      <Box mt={[0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}   >
       <CreateStore isSeller={data?.user.Seller}/>
      </Box>
      }

      {data && <Footer/>}

      <NextSeo
      title={`Create Store | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/stores/createstore`}
      description="BlackedMarket lets you create stores for whatever it is"
      openGraph={{
        url:`https://blackedmarket.vercel.app/stores/createstore`,
        title:`Create Store | BlackedMarket`,
        description:"BlackedMarket lets you create stores for whatever it is",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `Create Store | BlackedMarket`,
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
    );
  }