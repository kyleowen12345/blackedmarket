import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import Cookies from 'js-cookie'
import Profile from "../../components/user/Profile";
import Loader from '../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Menu from '../../components/user/Menu';
import { useAuth } from '../../lib/auth';
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
  const {authToken,userData}=useAuth()
    const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      profile()
  }, [])
  return (
    <>
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>:
    <Box mt={[0,0,10]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]} display="flex">
     <Menu data={userData}/>
     {data && <Profile user={data?.user} />}
    </Box>}
    </>
  )
}
