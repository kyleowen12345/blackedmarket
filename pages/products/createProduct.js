import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { Box,Text,Link,Button } from "@chakra-ui/react"
import {useAuth} from "../../lib/auth"
import CreateProduct from '../../components/product/CreateProduct';
 const ALLMYSTORES = gql`
 {
    allMyStores{
      id
      storeName
    }
  }
`;

export default function Home() {
    const {authToken}=useAuth()
    const [allMyStores,{ data,error,loading }] = useLazyQuery(ALLMYSTORES,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
        allMyStores()
  }, [])
 
  return (
    <Box mt={[0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}>
    <CreateProduct storeNames={data?.allMyStores}/>
    </Box>
  )
}
