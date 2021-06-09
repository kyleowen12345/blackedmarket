import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import Cookies from 'js-cookie'
import Profile from "../../components/user/Profile";
import Loader from '../../components/Loader/Loader';
 const PROFILE = gql`
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
    }
  }
`;


export default function Home() {
    const [profile,{ data,error,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
      profile()
  }, [])
  return (
    <div >
       {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
     {data && <Profile user={data?.user}/>}
    </div>
  )
}
