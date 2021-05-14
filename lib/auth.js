import React,{useState,useContext,createContext, useEffect} from 'react'
import Cookies from 'js-cookie';
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
       return isSignedIn(null)
    }
    useEffect(() => {
         const user=Cookies.get('blackedmarket')
        if(user){
           return setAuthToken(user)
         }else{
           return setAuthToken(null)
         }
    }, [])
    return {
    signUp,
    Login,
    signOut,
    authToken
    }
}