import React,{useState,useContext,createContext, useEffect} from 'react'





const storeInfoContext=createContext()


export function StoreInfoProvider({children}) {
    const storeInfo = useProvideStoreInfo();
    return <storeInfoContext.Provider value={storeInfo}>{children}</storeInfoContext.Provider>;
}

export const useStoreInfo = () => {
    return useContext(storeInfoContext);
};

function useProvideStoreInfo(){
    const [storeInformation,setStoreInformation]=useState(null)
   
 
    console.log(storeInformation)
   
    return {
        storeInformation,
        setStoreInformation
    }
}