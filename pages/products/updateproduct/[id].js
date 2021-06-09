import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Cookies from 'js-cookie'
import UpdateProduct from "../../../components/product/UpdateProduct";
import Loader from '../../../components/Loader/Loader';
 const UPDATEPRODUCTINFO = gql`
 query ($id:ID!){
    productInfoUpdate(id:$id){
        id
        productName 
         price
         productStocks
         sold
         image
         description
         createdAt
         storeName{
           storeName
           id
         }
         storeOwner{
           id
           email
         }
  }
}
`;

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const [updateproductinfo,{ data,error,loading }] = useLazyQuery(UPDATEPRODUCTINFO,{variables:{id:id },context:{headers:{token:Cookies.get('blackedmarket')||""}}});
    useEffect(() => {
      updateproductinfo()
  }, [])
  return (
    <div >
       {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <UpdateProduct product={data?.productInfoUpdate}/>} 
       
    </div>
  )
}
