import {  gql } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
import { useQuery } from "@apollo/client";
import ProductLandingPage from "../components/product/ProductLandingPage"
import StoreLandingPage from "../components/store/StoreLandingPage"
import { Box,useMediaQuery,Text  } from "@chakra-ui/react"
import { useEffect, useState } from "react";


const LANDINGPAGE = gql`
  query {
    landingpage{
      stores{
        id
        storeName
        storeType
        sellerName{
          email
        }
        storeBackgroundImage
      }
    products{
       id
      storeName{
        id
        storeName
      }
      productName
      price
      image
      description
    }
      
    }
  }
`;


export default function Home({initialApolloState}) {
  const { data,error } = useQuery( LANDINGPAGE );
  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)")
  const [screen,setScreen]=useState()
  useEffect(()=>{
   if(!isLargerThan1200){
  return setScreen("100%")
   }else{
    return setScreen(1200)
   }
  },[isLargerThan1200])
  console.log(isLargerThan1200)
  return (
    <>
    <Box width={screen} mr="auto" ml="auto"  p={[3,2,0]}  display="flex" flexDirection="column" justifyContent="center">
    <Text  size="2xl" bg="white" mt={4} mb={2} p={3} fontWeight="bold" boxShadow="md"  >Top Stores</Text>
    <StoreLandingPage stores={data?.landingpage.stores}/>
   <Text  size="2xl" bg="white" mt={4} mb={2} p={3} fontWeight="bold" boxShadow="md" >Latest Products</Text>
   <ProductLandingPage products={data?.landingpage.products}/>
    </Box>
   
   </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query:LANDINGPAGE,
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState },revalidate:1 };
}