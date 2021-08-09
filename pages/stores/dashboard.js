import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useAuth } from "../../lib/auth"
import { Box,Text,Link,Button } from "@chakra-ui/react"
import Loader from '../../components/Loader/Loader';
import ProductDashBoard from '../../components/Dashboard/ProductDashBoard';
import StoreDashBoard from '../../components/Dashboard/StoreDashBoard';
export const DASHBOARD = gql`
query {
    dashBoard{
      productCount
      storeCount
      products{
        productName
        price
        image
        sold
        storeName{
          storeName
        }
        
      }
      stores{
        storeName
        storeType
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
    
    {data &&<StoreDashBoard data={data?.dashBoard}/>}
   
     
    </Box>
  )
}