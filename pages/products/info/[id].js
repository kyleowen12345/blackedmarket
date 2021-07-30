import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import ProductInfo from "../../../components/product/productinfo/ProductInfo";
import Loader from '../../../components/Loader/Loader';
import { Box } from "@chakra-ui/react"
import ProductInfoSubNav from '../../../components/product/productinfo/ProductInfoSubNav'
import Footer from '../../../components/Footer/Footer';

export const PRODUCTINFO = gql`
 query ($id:ID!){
    productInfo(id:$id){
      product{
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
      storeType
      contactNumber
      createdAt
      storeBackgroundImage
    }
    storeOwner{
      id
      email
    }
    }
  relatedProducts
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const [productinfo,{ data,error,loading,refetch }] = useLazyQuery( PRODUCTINFO,{variables:{id:id }} );
  useEffect(() => {
    if(id){
     return productinfo()
    }else{
      return
    }
    
  }, [id])
  return (
    <>
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>
    :
         <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   >
           <ProductInfoSubNav data={data} id={id}/>
              {data && 
              <ProductInfo product={data?.productInfo} refetch={refetch}/>
              }
       </Box>
       }
      {data && <Footer/>} 
    </>
  )
}