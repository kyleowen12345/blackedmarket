import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";;
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import UpdateStore from "../../../components/store/UpdateStore";
import Cookies from 'js-cookie'
 const UPDATESTOREINFO = gql`
 query ($id:ID!){
    storeInfoUpdate(id:$id){
    id
    storeName
    storeAddress
    storeDescription
    storeType
    socialMediaAcc
    contactNumber
    storeBackgroundImage
  }
}
`;

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const [updatestoreinfo,{ data,error,loading }] = useLazyQuery(UPDATESTOREINFO,{variables:{id:id },context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
      if(id){
        return updatestoreinfo()
      }else{
        return
      }
      
  }, [id])
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <UpdateStore store={data?.storeInfoUpdate}/>}
    </div>
  )
}
