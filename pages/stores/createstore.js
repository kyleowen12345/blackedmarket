import React, {useEffect} from 'react'
import { useLazyQuery  } from "@apollo/client";
import CreateStore from '../../components/store/CreateStore'
import { Box,Text,Link,Button } from "@chakra-ui/react"
import {PROFILE} from '../user/profile'
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"

export default function createStore() {
   const {authToken,userCookie}=useAuth()
   const router = useRouter()
   const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }else{
        return profile()
      }
  }, [])
    return (
        <Box mt={[0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}   >
       <CreateStore isSeller={data?.user.Seller}/>
      </Box>
    );
  }