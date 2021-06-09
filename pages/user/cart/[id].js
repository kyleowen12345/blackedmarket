import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import GetCartInfo from "../../../components/product/GetCartInfo";
import Cookies from 'js-cookie'
import Loader from '../../../components/Loader/Loader';
const CARTINFO = gql`
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

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const [cartinfo,{ data,error,loading }] = useLazyQuery( CARTINFO,{variables:{curPage:id||"1"},context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
        cartinfo()
    }, [])
  
  return (
    <div >
       {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
     {data && <GetCartInfo cart={data?.getCartInfo}/>}
     
    </div>
  )
}
