import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Cookies from 'js-cookie'
import StoreDashBoard from "../../../components/store/StoreDashBoard";
import Loader from '../../../components/Loader/Loader';
export const MYSTORES = gql`
query paginate($curPage:String!) {
    myStores(curPage:$curPage){
      curPage
      maxPage
      storeCount
     stores{
      id
      storeName
      storeBackgroundImage
      storeType
    }
    }
  }
`;


export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const [mystores,{ data, loading,error }] = useLazyQuery( MYSTORES,{variables:{curPage:id || "1"},context:{headers:{token:Cookies.get('blackedmarket')||""}}} );
  useEffect(() => {
    mystores()
}, [])
  return (
    <div >
     {loading && <Loader/>}
    {error && <h1>{error?.message}</h1>}
     <StoreDashBoard mystore={data?.myStores}/>
    </div>
  )
}