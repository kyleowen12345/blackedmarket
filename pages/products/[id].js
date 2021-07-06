import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Products from "../../components/product/Products";
import Loader from '../../components/Loader/Loader';
import { Box } from "@chakra-ui/react"
export const PRODUCTS = gql`
query ($curPage:String!,$sortOrder:String!){
  productpaginate(curPage:$curPage,sortOrder:$sortOrder){
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
  const {id,sortOrder}= router.query
  const [products,{ data, loading,error }] = useLazyQuery( PRODUCTS,{variables:{curPage:id || "1",sortOrder:sortOrder}} );
  useEffect(() => {
    if( id){
      return products()
    }else{
      return
    }
  }, [id])
  return (
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" >
      {loading && <Loader/>}
       {error && <h1>{error?.message}</h1>}
       {data && <Products  data={data?.productpaginate} />}
       
    </Box>
  )
}