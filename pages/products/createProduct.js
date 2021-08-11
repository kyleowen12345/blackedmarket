import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { Box,Text,Link,Button } from "@chakra-ui/react"
import {useAuth} from "../../lib/auth"
import CreateProduct from '../../components/product/CreateProduct';
import Footer from '../../components/Footer/Footer';
import { useRouter } from "next/router"
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
    <Box mt={[0,0,0,5]}  borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]} boxShadow="md">
    {data?.allMyStores.length < 1  ? 
    <Box height={["200px","200px","400px"]} display="flex" justifyContent="center" alignItems="center"><Link fontWeight="bold" fontSize={["15px","15px","20px"]}>Please create a store first, then go back here.</Link></Box>
    : <CreateProduct storeNames={data?.allMyStores}/>}
    </Box>
    <Footer/>
    </>
  )
}
