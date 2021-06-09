import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Purchases from "../../../components/user/Purchases";
import Cookies from 'js-cookie'
 const PURCHASES = gql`
 query ($curPage:String!){
    getHistoryInfo(curPage:$curPage){
      curPage
      maxPage
      productCount
      history{
        name
        quantity
        id
        image
        price
        dateOfPurchase
        storeName
      }
    }
  }
`;

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const [purchases,{ data,error,loading }] = useLazyQuery( PURCHASES,{variables:{curPage:id||"1"},context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
      purchases()
  }, [])
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       <h1>Purchases</h1>
       <Purchases history={data?.getHistoryInfo}/>
    </div>
  )
}