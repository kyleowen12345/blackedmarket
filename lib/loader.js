import React,{useState,useContext,createContext, useEffect,useRef} from 'react'
import { useRouter } from 'next/router'

const loaderContext=createContext()


export function LoadProvider({children}) {
    const load = useProvideLoad();
    return <loaderContext.Provider value={load}>{children}</loaderContext.Provider>;
}

export const useLoad = () => {
    return useContext(loaderContext);
};

function useProvideLoad(){
    const router=useRouter()
    const [currentPage,setCurrentPage]=useState(router.pathname)
    const [progress,setProgress]=useState(0)
    const latestPathName=router.pathname
    const samePathName=currentPage == router.pathname
    console.log(latestPathName)
    console.log(currentPage)
    console.log(samePathName)
    useEffect(() => {
        setCurrentPage(router.pathname)
        if(samePathName === true){
           return setProgress(0)
        }
       
    }, [router.pathname,samePathName,progress,setProgress])
   
    console.log(progress)
    return {
        currentPage,
        latestPathName,
        samePathName,
        progress,
        setProgress
    }
}