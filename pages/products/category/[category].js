import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Loader from '../../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Footer from '../../../components/Footer/Footer';
import Error from '../../../components/Error/Error';
import { NextSeo } from 'next-seo';
import Categories from '../../../components/product/Category/Categories';

export const PRODUCTCATEGORY = gql`
query ($category:String!,$curPage:String!,$sortOrder:String!){
    productCategory(category:$category,curPage:$curPage,sortOrder:$sortOrder){
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

export default function Category() {
  const router = useRouter()
  const {id,category,sortOrder}= router.query
  const [productcategory,{ data, loading,error }] = useLazyQuery( PRODUCTCATEGORY,{variables:{category:category,curPage:id||"1",sortOrder:sortOrder}} );
  
  useEffect(() => {
    if(category){
   return  productcategory()
    }
 
  }, [category,id,sortOrder])
  
  return (
    <>
    {loading ? <Loader/> 
    : 
    error ?  <Error message={error?.message}/> 
    :
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" minH="600px">
       {data && <Categories data={data} category={category} sortOrder={sortOrder}/> }
   </Box>
    }

     {data && <Footer/>}

    <NextSeo
      title={!category ? ` Category | BlackedMarket` : `${category} | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/products/category/${category}?id=${id}&sortOrder=${sortOrder}`}
      description={!category ? "This is are the products related to category choosen .":`This  are the products related to ${category} .`}
      openGraph={{
        url:`https://blackedmarket.vercel.app/products/category/${category}?id=${id}&sortOrder=${sortOrder}`,
        title:`Category | BlackedMarket`,
        description:`This  are the products related to category choosen .`,
        images:[
          {
            url: 'https://res.cloudinary.com/kaking/image/upload/v1628751336/products_dctlnv.png',
            width: 200,
            height: 200,
            alt: `${category} | BlackedMarket`,
          }
              ]
      }}
      twitter={{
      site:'BlackedMarket',
      cardType:'summary_large_image',
      handle:'Kyle Owen Ga'
      }}>
     </NextSeo>
  </>
  )
}