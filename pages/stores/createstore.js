import React, {useEffect} from 'react'
import { useLazyQuery  } from "@apollo/client";
import CreateStore from '../../components/store/CreateStore'
import { Box,Text,Link,Button } from "@chakra-ui/react"
import {PROFILE} from '../user/profile'
import { useAuth } from '../../lib/auth';
export default function createStore() {
   const {authToken}=useAuth()
   const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      profile()
  }, [])
  console.log(data)
    return (
        <Box mt={[0,0,5]} borderRadius={5} bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}   >
       <CreateStore isSeller={data?.user.Seller}/>
      </Box>
    );
  }