import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Products from "../../../components/product/Products";
import Loader from '../../../components/Loader/Loader';
import { Heading } from "@chakra-ui/react"

const SEARCHPRODUCT = gql`
  query ($product:String!,$curPage:String) {
    searchProduct(product:$product,curPage:$curPage){
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
    curPage
    maxPage
    productCount
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {id,search}= router.query
  const [searchproduct,{ data, loading,error }] = useLazyQuery( SEARCHPRODUCT,{variables:{product:search,curPage:id||"1"}} );
  useEffect(() => {
    if(search){
   return  searchproduct()
    }
 
  }, [search])
  console.log(data)
  return (
    <div >
       {loading && <Loader/>}
        <Heading as="h3">result for "{search}"</Heading>
       {error && <h1>{error?.message}</h1>}
       {data && <Products  data={data.searchProduct} />}
       
    </div>
  )
}