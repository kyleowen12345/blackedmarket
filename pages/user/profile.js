import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import Cookies from 'js-cookie'
import Profile from "../../components/user/Profile";
import Loader from '../../components/Loader/Loader';
import { Box,Text,Link} from "@chakra-ui/react"
export const PROFILE = gql`
 {
    user{
      email
      id
      name
      profilePic
      contactNumber
      country
      city
      SocialMediaAcc
      zipcode
      Seller
    }
  }
`;


export default function Home() {
    const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
      profile()
  }, [])
  return (
    <>
    {loading && <Loader/>}
    <Box mt={[0,0,5]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}>
       
       {error && <h1>{error?.message}</h1>}
     {data && <Profile user={data?.user}/>}
    </Box>
    </>
  )
}
