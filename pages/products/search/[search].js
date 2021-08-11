import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Pagination from '../../../components/helpers/Pagination';
import Loader from '../../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Footer from '../../../components/Footer/Footer';
import Searched from '../../../components/Searched/Searched';
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
  const [searchproduct,{ data, loading,error }] = useLazyQuery( SEARCHPRODUCT,{variables:{product:search,curPage:id,sortOrder:sortOrder||"1"}} );
  useEffect(() => {
    if(search){
   return  searchproduct()
    }
 
  }, [search])
  const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
  return (
    <>
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>
    :
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" >
      {data && <Searched sorterList={sorterList} sortOrder={sortOrder} route={`/products/search/${search}?id=${id}&`} products={data?.searchProduct.products} result={search}/>}
     {data?.searchProduct.maxPage > 1 && <Pagination marginPages={1} pageRange={2} initialPage={data?.searchProduct.curPage - 1} pageCount={data?.searchProduct.maxPage} />}
   </Box>

    }
    {data && <Footer/>}
    </>
  )
}