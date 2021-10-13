import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import ProductInfo from "../../../components/product/ProductInformation/ProductInfo";
import Loader from '../../../components/Loader/Loader';
import { Box } from "@chakra-ui/react"
import ProductInfoSubNav from '../../../components/product/ProductInformation/ProductInfoSubNav'
import Footer from '../../../components/Footer/Footer';
import { NextSeo } from 'next-seo';
import Error from '../../../components/Error/Error';

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

export default function ProductInformation() {
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
    {loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/>
    :
         <Box mt={[0,0,6,7,8]} width={["100%","100%","95%","95%","95%",1200]} mr="auto" ml="auto"   >
              {data && 
              <>
              <ProductInfoSubNav data={data} id={id}/>
              <ProductInfo product={data?.productInfo} refetch={refetch}/>
              </>
              }
       </Box>
       }
      {data && <Footer/>} 
      <NextSeo
       title={!data ? 'Product Information | BlackedMarket' : `${data?.productInfo.product.productName} | BlackedMarket`} 
       canonical={`https://blackedmarket.vercel.app/products/info/${id}`}
       description="BlackedMarket product information page shows the complete details about the product." 
      openGraph={{
      url:`https://blackedmarket.vercel.app/products/info/${id}`,
      title:'Product Information | BlackedMarket',
      description:"BlackedMarket product information page shows the complete details about the product",
      images:[
        {
          url: 'https://res.cloudinary.com/kaking/image/upload/v1628814469/productinfo_kdvkiv.png',
          width: 200,
          height: 200,
          alt: 'Product Information | BlackedMarket',
        }
      ]
    }}
    twitter={{
      site:'BlackedMarket',
      cardType:'summary_large_image',
      handle:'Kyle Owen Ga'
    }}
    
    
    >
    </NextSeo>
    </>
  )
}