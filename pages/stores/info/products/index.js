import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import SortedProducts from '../../../../components/store/StoreInfo/StoreProducts/SortedProducts';
import Loader from '../../../../components/Loader/Loader';
import Footer from '../../../../components/Footer/Footer'
import Error from '../../../../components/Error/Error'
import { NextSeo } from 'next-seo';

export const STOREPRODUCT = gql`
query($storeId:String!,$curPage:String!$sortOrder:String!){
    storeProducts(storeId:$storeId,curPage:$curPage,sortOrder:$sortOrder){
      curPage
      maxPage
      productCount
      products{
        id
        productName
        price
        sold
        createdAt
        productStocks
        image
      }
    }
  }
`;

export default function Home() {
  const router = useRouter()
  const {id,sortOrder,store}= router.query
  const [storeproduct,{ data, error,loading }] = useLazyQuery( STOREPRODUCT,{variables:{storeId:store,curPage:id,sortOrder:sortOrder }} );
  useEffect(() => {
      if(store && id){
        return storeproduct()
      }else{
          return
      }
  }, [id])
  return (
    <>
     {
     loading ? <Loader/>
     :
     error ?  <Error message={error?.message}/>
     :
     <SortedProducts product={data?.storeProducts}/>
     }

     {data && <Footer />}
     
     <NextSeo
      title='Store Products | BlackedMarket'
      canonical={`https://blackedmarket.vercel.app/stores/info/products?store=${store}&id=${id}&sortOrder=${sortOrder}`}
      description="BlackedMarket's store products page shows the products of the store"
      openGraph={{
        url:`https://blackedmarket.vercel.app/stores/info/products?store=${store}&id=${id}&sortOrder=${sortOrder}`,
        title:`Store Products | BlackedMarket`,
        description:"BlackedMarket's store products page shows the products of the store" ,
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: 'Store Products | BlackedMarket',
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