import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Purchases from "../../components/user/Purchases";
import { Box} from "@chakra-ui/react"
import { useAuth } from '../../lib/auth';
import Loader from '../../components/Loader/Loader';
import Menu from '../../components/user/Menu';
import SmallMenu from '../../components/user/SmallMenu';
 const PURCHASES = gql`
 query ($curPage:String!,$keyword:String){
  getHistoryInfo(curPage:$curPage,keyword:$keyword){
    curPage
    maxPage
    productCount
    history{
      id
      price
      name
      quantity
      storeName
      dateOfPurchase
      storeOwner
      image
    }
  }
}
`;

export default function Home() {
  const {authToken,userData}=useAuth()
    const router = useRouter()
    const {id,keyword}= router.query
    const [purchases,{ data,error,loading }] = useLazyQuery(PURCHASES,{variables:{curPage:id || "1",keyword:keyword},context:{headers:{token:authToken||""}}, fetchPolicy: "no-cache" });
    useEffect(() => {
        purchases()
  }, [])
  return (
    < >
      {loading ? <Loader/> : error ? <h1>{error?.message}</h1>:
       <Box  mt={[0,0,0,0,10]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
       <Menu data={userData}/>
       <SmallMenu />
       <Purchases history={data?.getHistoryInfo}/>
       </Box>}
    </>
  )
}