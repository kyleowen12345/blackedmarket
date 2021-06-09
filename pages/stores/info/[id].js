import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useRouter } from "next/router"
import StoreInfo from "../../../components/store/StoreInfo";
import Link from 'next/link'
import StoreProduct from "../../../components/product/StoreProduct";
import Loader from '../../../components/Loader/Loader';
export const STORESINFO = gql`
 query ($id:ID!){
    storeInfo(id:$id){
      store{
        id
        storeName
        storeAddress
        storeDescription
        storeType
        sellerName{
          id
          email
          name
        }
        socialMediaAcc
        contactNumber
        createdAt
        storeBackgroundImage
      }
      products{
        id
        productName
        price
        image
      }
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const [storesinfo,{ data, error,loading }] = useLazyQuery( STORESINFO,{variables:{id:id }} );
  useEffect(() => {
    storesinfo()
  }, [])
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
       {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <StoreInfo store={data?.storeInfo.store} />}
       {data && <StoreProduct product={data?.storeInfo.products}/>}
    </div>
  )
}