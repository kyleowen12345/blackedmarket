import React,{useState,useContext,createContext, useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export const CARTINFO = gql`
 query ($curPage:String!){
    getCartInfo(curPage:$curPage){
     curPage
      maxPage
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
    const [cartinfo,{ data,error,loading,refetch }] = useLazyQuery( CARTINFO,{variables:{curPage:"1"},context:{headers:{token:Cookies.get('blackedmarket')||""}},fetchPolicy:"no-cache"});
    const userCookie=Cookies.get('blackedmarket')
    useEffect(() => {
        if(userCookie){
            cartinfo()
         }
    }, [userCookie])
   console.log(loading)
    return {
    data,
    cartinfo,
    loading,
    error,
    cartRefetch:refetch
    }
}