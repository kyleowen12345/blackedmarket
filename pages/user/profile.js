import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from 'next/router'
import Profile from "../../components/user/UserProfile/Profile";
import Loader from '../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Menu from '../../components/user/ReusableUserComponents/Menu';
import { useAuth } from '../../lib/auth';
import SmallMenu from '../../components/user/ReusableUserComponents/SmallMenu';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';
import { NextSeo } from 'next-seo';

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
    {loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/>
    :
    <Box mt={[0,0,0,0,5]}  width={["100%","100%","100%","100%","95%",1200]} mr="auto" ml="auto"   p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
     {data && 
     <>
     <Menu data={userData}/>
     <SmallMenu/> 
     <Profile user={data?.user} />
     </>
     }
    </Box>}

    {data && <Footer/>}

    <NextSeo
      title={`Profile | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/user/profile`}
      description="BlackedMarket bond diversification helps you improve your life."
      openGraph={{
        url:`https://blackedmarket.vercel.app/user/profile`,
        title:`Profile | BlackedMarket`,
        description:"BlackedMarket bond diversification helps you improve your life.",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `Profile | BlackedMarket`,
          }
              ]
      }}
      twitter={{
      site:'BlackedMarket',
      cardType:'summary_large_image',
      handle:'Kyle Owen Ga'
      }}>
     </NextSeo>
  
    </>
  )
}
