import React,{useState,useContext,createContext, useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export const CARTINFO = gql`
 query{
    getCartInfo{
      productCount
      cart{
        id
        quantity
        date
        productName
        image
        price
        storeName
        storeOwner
      }
    }
  }
`;

const cartContext=createContext()


export function CartProvider({children}) {
    const cart = useProvideCart();
    return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
}

export const useCart = () => {
    return useContext(cartContext);
};

function useProvideCart(){
    const [cartinfo,{ data,error,loading,refetch }] = useLazyQuery( CARTINFO,{context:{headers:{token:Cookies.get('blackedmarket')||""}},fetchPolicy:"cache-and-network"});
    const userCookie=Cookies.get('blackedmarket')
    useEffect(() => {
        if(userCookie){
           return cartinfo()
         }else{
           return
         }
    }, [userCookie])
    return {
    data,
    cartinfo,
    loading,
    error,
    cartRefetch:refetch,
    }
}