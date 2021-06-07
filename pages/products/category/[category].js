import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Products from "../../../components/product/Products";
import Loader from '../../../components/Loader/Loader';
import { Heading } from "@chakra-ui/react"

export const PRODUCTCATEGORY = gql`
query ($category:String!,$curPage:String!){
    productCategory(category:$category,curPage:$curPage){
      curPage
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
      productCount
      maxPage
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {id,category}= router.query
  const [productcategory,{ data, loading,error }] = useLazyQuery( PRODUCTCATEGORY,{variables:{category:category,curPage:id||"1"}} );
  useEffect(() => {
    if(category){
   return  productcategory()
    }
 
  }, [category])
  console.log(data)
  return (
    <div >
      {loading && <Loader/>}
        <Heading as="h1">{category}</Heading>
       {error && <h1>{error?.message}</h1>}
       {data && <Products  data={data.productCategory} />}
       
    </div>
  )
}