import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Link from 'next/link'
import Products from "../../components/product/Products";
import Loader from '../../components/Loader/Loader';
export const PRODUCTS = gql`
query ($curPage:String!){
  productpaginate(curPage:$curPage){
    curPage
    productCount
    maxPage
    products{
      id
      productName
      price
      description
      image
      storeName{
       storeName
      }
      storeOwner{
        email
      }
    }
    
  }
}
`;

export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const [products,{ data, loading,error }] = useLazyQuery( PRODUCTS,{variables:{curPage:id || "1"}} );
  useEffect(() => {
    products()
  }, [])
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
      {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <Products  data={data} />}
       
    </div>
  )
}