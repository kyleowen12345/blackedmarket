import React,{useState,useContext,createContext, useEffect} from 'react'
import Cookies from 'js-cookie';
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
const PROFILE = gql`
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
    const [authToken,setAuthToken]=useState(null)
    const [userData,setUserData]=useState(null)
    const user=Cookies.get('blackedmarket')
    const [profile,{ data,loading }] = useLazyQuery( PROFILE,{context:{headers:{token:user||""}}});
    console.log(loading)
    const isSignedIn=(user)=>{
        if(user){
            setAuthToken(user)
            profile()
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
      setUserData(null)
      setAuthToken(null)
      Cookies.remove('blackedmarket')
    }
    useEffect(() => {
        if(user){
           return isSignedIn(user)
         }else{
           return isSignedIn(null)
         }
    }, [])
    useEffect(() => {
        if(data){
           return setUserData(data)
         }
    }, [data])

    return {
    signUp,
    Login,
    signOut,
    authToken,
    userData
    }
}