import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";;
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import UpdateStore from "../../../components/store/UpdateStore";
import { Box,Text,Link,Button } from "@chakra-ui/react"
import Cookies from 'js-cookie'
import Loader from '../../../components/Loader/Loader';
import { STORESINFO } from '../info/[id]';
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
    const [storesInfo,{ data,error,loading }] = useLazyQuery(STORESINFO,{variables:{id:id }});
    useEffect(() => {
      if(id){
        return storesInfo()
      }else{
        return
      }
      
  }, [id])
  return (
    <>
     {loading && <Loader/>}
    <Box mt={[0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}  >
       {error && <h1>{error?.message}</h1>}
       {data && <UpdateStore store={data?.storeInfo.store} id={id}/>}
    </Box>
    </>
  )
}
