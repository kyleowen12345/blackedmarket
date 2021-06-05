import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import Homepage from "../../components/store/Stores";
import { useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Link from 'next/link'
import Loader from '../../components/Loader/Loader';
export const STORES = gql`
query paginate($curPage:String!) {
    storespaginate(curPage:$curPage){
      stores{
        id
        storeName
        storeBackgroundImage
        sellerName{
          id
          email
          name
        }
        storeType
      }
      curPage
      maxPage
      storeCount
    }
  }
`;
export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const [stores,{ data, loading,error } ]= useLazyQuery( STORES,{variables:{curPage:id || "1" }} );
  useEffect(() => {
    stores()
  }, [])
  console.log(loading)
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
      {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <Homepage  data={data} loading={loading}/>}
    </div>
  )
}