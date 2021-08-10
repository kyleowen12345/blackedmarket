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
// {loading && <Loader/>}
//     {error && <h1>{error?.message}</h1>}
  return (
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" mt={[0,0,0,10]}>

    {data && <ProductDashBoard data={data?.dashBoard}/>}
    {data && <ProductsAccordion data={data?.dashBoard}/>}
    
    {data &&<StoreDashBoard data={data?.dashBoard}/>}
    {data && <StoreAccordion data={data?.dashBoard}/>}
   
     
    </Box>
  )
}