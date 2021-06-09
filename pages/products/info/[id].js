import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useRouter } from "next/router"
import ProductInfo from "../../../components/product/ProductInfo";
import Link from 'next/link'
import Loader from '../../../components/Loader/Loader';
export const PRODUCTINFO = gql`
 query ($id:ID!){
    productInfo(id:$id){
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
  const [productinfo,{ data,error,loading }] = useLazyQuery( PRODUCTINFO,{variables:{id:id }} );
  useEffect(() => {
    productinfo()
  }, [])
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
      {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <ProductInfo product={data?.productInfo}/>}
    </div>
  )
}