import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Loader from '../../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Footer from '../../../components/Footer/Footer';
import Error from '../../../components/Error/Error';
import { NextSeo } from 'next-seo';
import Searches from '../../../components/product/Search/Searches';


const SEARCHPRODUCT = gql`
  query ($product:String!,$curPage:String,$sortOrder:String!) {
    searchProduct(product:$product,curPage:$curPage,sortOrder:$sortOrder){
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
  const {id,search,sortOrder}= router.query
  const [searchproduct,{ data, loading,error }] = useLazyQuery( SEARCHPRODUCT,{variables:{product:search,curPage:id||"1",sortOrder:sortOrder}} );
  useEffect(() => {
    if(search){
   return  searchproduct()
    }
 
  }, [search,id,sortOrder])
  
  return (
    <>
    {

    loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/>
    :
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" minH="600px">
        {data && <Searches data={data} search={search} sortOrder={sortOrder}/>}
   </Box>

    }

    {data && <Footer/>}

    <NextSeo
      title={!search ? 'Search | BlackedMarket': `${search} | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/products/search/${search}?id=${id}&sortOrder=${sortOrder}`}
      description={!search ? "This  are the products related to the search query": `This are the products related search query "${search}" .`}
      openGraph={{
        url:`https://blackedmarket.vercel.app/products/search/${search}?id=${id}&sortOrder=${sortOrder}`,
        title:`Search | BlackedMarket`,
        description:"This  are the products related to the search query" ,
        images:[
          {
            url: 'https://res.cloudinary.com/kaking/image/upload/v1628751336/products_dctlnv.png',
            width: 200,
            height: 200,
            alt: `${search} | BlackedMarket`,
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