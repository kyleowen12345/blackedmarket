import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useAuth } from "../../lib/auth"
import { Box,Text,Link,Button } from "@chakra-ui/react"
import Loader from '../../components/Loader/Loader';
import ProductDashBoard from '../../components/Dashboard/ProductDashBoard';
import StoreDashBoard from '../../components/Dashboard/StoreDashBoard';
import ProductsAccordion from '../../components/Dashboard/ProductsAccordion';
import StoreAccordion from '../../components/Dashboard/StoreAccordion';
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
  const {authToken}=useAuth()

  const [dashboard,{ data, loading,error }] = useLazyQuery( DASHBOARD,{context:{headers:{token:authToken||""}}} );
  useEffect(() => {
    dashboard()
}, [])
console.log(data)

  return (
   <> 
   {loading ? <Loader/> : error ? <h1>{error?.message}</h1> :
    <Box width={["90%","90%","90%","100%","100%",1200]} mr="auto" ml="auto" mt={5}>
     <Text fontSize={["25px","25px","25px","30px"]} fontWeight="bold">Dashboard</Text>
    {data &&  <>
     <ProductDashBoard data={data?.dashBoard}/>
     <ProductsAccordion data={data?.dashBoard}/>
    
     <StoreDashBoard data={data?.dashBoard}/>
     <StoreAccordion data={data?.dashBoard}/>
     </>}
    </Box>}
    </>
  )
}