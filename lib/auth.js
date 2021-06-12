import React,{useState,useContext,createContext, useEffect} from 'react'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'

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
    const router = useRouter()
    const user=Cookies.get('blackedmarket')
    let decoded=null
    if(authToken){
        decoded=jwt_decode(authToken)
    }
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
        if(user){
           return isSignedIn(user)
         }else{
           return isSignedIn(null)
         }
    }, [user])

    return {
    signUp,
    Login,
    signOut,
    authToken,
    decoded,
    }
}