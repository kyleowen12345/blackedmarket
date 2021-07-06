import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import Stores from "../../components/store/Stores";
import { useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Loader from '../../components/Loader/Loader';
import { Box } from "@chakra-ui/react"
export const STORES = gql`
query paginate($curPage:String!,$sortOrder:String!) {
    storespaginate(curPage:$curPage,sortOrder:$sortOrder){
      stores{
        id
        storeName
        storeBackgroundImage
        sellerName{
          id
          email
          name
        }
        storeType
      }
      curPage
      maxPage
      storeCount
    }
  }
`;
export default function Home() {
  const router = useRouter()
  const {id,sortOrder}= router.query
  const [stores,{ data, loading,error } ]= useLazyQuery( STORES,{variables:{curPage:id || "1",sortOrder:sortOrder }} );
  useEffect(() => {
    if(sortOrder && id){
      return stores()
    }else{
      return
    }
  }, [id])
  return (
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" >
      {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <Stores  data={data} loading={loading}/>}
    </Box>
  )
}