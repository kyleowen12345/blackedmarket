import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import { Box} from "@chakra-ui/react"
import { useAuth } from '../../lib/auth';
import Loader from '../../components/Loader/Loader';
import Menu from '../../components/user/Menu';
import Following from '../../components/user/Following';
export const FOLLOWING = gql`
 query ($curPage:String!,$keyword:String){
    getFollowingStore(curPage:$curPage,keyword:$keyword){
        curPage
        maxPage
        followCount
        follow{
          id
          storeDescription
          storeName
          storeType
          storeBackgroundImage
        }
}
}
`;

export default function Home() {
  const {authToken,userData}=useAuth()
    const router = useRouter()
    const {id,keyword}= router.query
    const [following,{ data,error,loading }] = useLazyQuery(FOLLOWING,{variables:{curPage:id || "1",keyword:keyword},context:{headers:{token:authToken||""}} });
    useEffect(() => {
        following()
  }, [])
  return (
    < >
      {loading ? <Loader/> : error ? <h1>{error?.message}</h1>:
       <Box mt={[0,0,10]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]} display="flex">
       <Menu data={userData}/>
       <Following following={data?.getFollowingStore}/>
       </Box>}
    </>
  )
}