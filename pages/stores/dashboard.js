import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useAuth } from "../../lib/auth"
import { Box,Text,Link,Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Loader from '../../components/Loader/Loader';
import ProductDashBoard from '../../components/Dashboard/ProductDashBoard';
import StoreDashBoard from '../../components/Dashboard/StoreDashBoard';
import ProductsAccordion from '../../components/Dashboard/ProductsAccordion';
import StoreAccordion from '../../components/Dashboard/StoreAccordion';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';
import { NextSeo } from 'next-seo';

export const DASHBOARD = gql`
query {
    dashBoard{
      productCount
      storeCount
      products{
        id
        description
        productName
        price
        image
        sold
        storeName{
          storeName
        }
        
      }
      stores{
        id
        storeName
        storeType
        storeDescription
        storeBackgroundImage
        followers{
          email
        }
      }
    }
  }
`;


export default function Home() {
  const {authToken,userCookie}=useAuth()
  const router = useRouter()
  const [dashboard,{ data, loading,error }] = useLazyQuery( DASHBOARD,{context:{headers:{token:authToken||""}}} );
  useEffect(() => {
    if(!userCookie){
      return router.push('/login')
    }else{
    return dashboard()
    }
}, [])


  return (
   <> 
   {
   loading ? <Loader/> 
   : 
   error ? <Error message={error.message}/> 
   :
    <Box width={["90%","90%","90%","95%","95%",1200]} mr="auto" ml="auto" mt={5}>
    {data &&  
    <>
    <Text fontSize={["25px","25px","25px","30px"]} fontWeight="bold">Dashboard</Text>
     <ProductDashBoard data={data?.dashBoard}/>
     <ProductsAccordion data={data?.dashBoard}/>
    
     <StoreDashBoard data={data?.dashBoard}/>
     <StoreAccordion data={data?.dashBoard}/>
     </>}
    </Box>}

    {data && <Footer/>}

    <NextSeo
      title='Dashboard | BlackedMarket'
      canonical={`https://blackedmarket.vercel.app/stores/dashboard`}
      description="BlackedMarket's dashboard page shows it's users the details about their best products and stores "
      openGraph={{
        url:`https://blackedmarket.vercel.app/stores/dashboard`,
        title:`Dashboard | BlackedMarket`,
        description:"BlackedMarket's dashboard page shows it's users the details about their best products and stores" ,
        images:[
          {
            url: 'https://res.cloudinary.com/kaking/image/upload/v1628833325/dashboard_bp05ya.png',
            width: 200,
            height: 200,
            alt: 'DashBoard | BlackedMarket',
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