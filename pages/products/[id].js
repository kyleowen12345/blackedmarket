import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import  { useRouter } from "next/router"
import Products from '../../components/product/PaginatedProducts/Products';
import Loader from '../../components/Loader/Loader';


import { Box} from "@chakra-ui/react"
import Footer from '../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import { NextSeo } from 'next-seo';


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
    if(sortOrder ||  id){
      return products()
    }else{
      return
    }
  }, [id,sortOrder])
  return (
    <>
    {loading ? <Loader/> : error ? <Error message={error?.message}/>
    :
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" >
       {data && <Products data={data} />}
    </Box>
    }
    {data && <Footer/>}
    <NextSeo
    title='Products | BlackedMarket'
    canonical='https://blackedmarket.vercel.app/products/1?sortOrder=productName'
    description="We sell multiple types of products you've never seen before."
    openGraph={{
      url:'https://blackedmarket.vercel.app/products/1?sortOrder=productName',
      title:'Products | BlackedMarket',
      description:"We sell multiple types of products you've never seen before.",
      images:[
        {
          url: 'https://res.cloudinary.com/kaking/image/upload/v1628751336/products_dctlnv.png',
          width: 200,
          height: 200,
          alt: 'Products page',
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
