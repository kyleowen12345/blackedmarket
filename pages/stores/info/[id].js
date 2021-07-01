import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import StoreInfo from "../../../components/store/storeInfo/StoreInfo";
import { Box } from "@chakra-ui/react"
import Loader from '../../../components/Loader/Loader';
import { useAuth } from '../../../lib/auth';
export const STORESINFO = gql`
 query ($id:ID!){
    storeInfo(id:$id){
      store{
        id
        storeName
        storeAddress
        storeDescription
        storeType
        sellerName{
          id
          email
          name
        }
        socialMediaAcc
        contactNumber
        createdAt
        storeBackgroundImage
      }
      products{
        id
        productName
        price
        image
        sold
      }
      isUserAFollower
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {authToken}=useAuth()
  const {id}= router.query
  const [storesinfo,{ data, error,loading }] = useLazyQuery( STORESINFO,{variables:{id:id },context:{headers:{token:authToken || ""}}} );
  useEffect(() => {
    if(id){
      return storesinfo()
    }else{
      return
    }
    
  }, [id])
  console.log(data)
  return (
    <div >
       {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   >
       {data && <StoreInfo store={data?.storeInfo.store} product={data?.storeInfo.products} follower={data?.storeInfo.isUserAFollower}/>}
       </Box>
    </div>
  )
}