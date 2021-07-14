import React,{useState,useContext,createContext, useEffect} from 'react'
import {  gql,useQuery  } from "@apollo/client";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'

const PROFILE_QUERY = gql`
{
    user{
      email
      id
      name
      profilePic
    }
  }
`;

const authContext=createContext()


export function AuthProvider({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth(){
    const { client, loading, data,error} = useQuery(
        PROFILE_QUERY,{context:{headers:{token:Cookies.get('blackedmarket')||""}}},
        { fetchPolicy: "network-only" }
      );
    const userData=data?.user
    const [authToken,setAuthToken]=useState(null)
    const router = useRouter()
    const userCookie=Cookies.get('blackedmarket')
 

    const isSignedIn=(user)=>{
        if(user){
          setAuthToken(user)
          return Cookies.set('blackedmarket', user,{expires:1,secure:true});
        }else{
            setAuthToken(null)
            return Cookies.remove('blackedmarket')
         
        } 
    }
    const signUp=async (user)=>{
           return isSignedIn(user)
    }
    const Login=async (user)=>{
           return isSignedIn(user)
    }
     const signOut=async ()=>{
     router.push('/')
     return isSignedIn()
    }
    useEffect(() => {
        if(userCookie){
           return setAuthToken(userCookie)
         }else{
           return setAuthToken(null)
         }
    }, [userCookie])

    return {
    signUp,
    Login,
    signOut,
    authToken,
    userCookie,
    userData,
    loading
    }
}