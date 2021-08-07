import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from 'next/router'
import Profile from "../../components/user/Profile";
import Loader from '../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Menu from '../../components/user/Menu';
import { useAuth } from '../../lib/auth';
import SmallMenu from '../../components/user/SmallMenu';
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
  const router = useRouter()
  const {authToken,userData,userCookie}=useAuth()
    const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:authToken||""}}});
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }else{
        return  profile()
      }
     
  }, [userCookie])

  return (
    <>
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>:
    <Box mt={[0,0,0,0,10]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
     {data && 
     <>
     <Menu data={userData}/>
     <SmallMenu/> 
     <Profile user={data?.user} />
     </>
     }
    </Box>}
  
    </>
  )
}
