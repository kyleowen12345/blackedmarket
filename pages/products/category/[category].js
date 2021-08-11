import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Loader from '../../../components/Loader/Loader';
import { Box} from "@chakra-ui/react"
import Pagination  from '../../../components/helpers/Pagination';
import Footer from '../../../components/Footer/Footer';
import Searched from '../../../components/Searched/Searched';
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

export default function Home() {
  const router = useRouter()
  const {id,category,sortOrder}= router.query
  const [productcategory,{ data, loading,error }] = useLazyQuery( PRODUCTCATEGORY,{variables:{category:category,curPage:id,sortOrder:sortOrder||"1"}} );
  useEffect(() => {
    if(category){
   return  productcategory()
    }
 
  }, [category])
  const sorterList=[{link:"productName",name:"Name"},{link:"price",name:"Price"},{link:"sold",name:"Sold"},{link:"createdAt",name:"Date"},{link:"productStocks",name:"Stocks"}]
  return (
    <>
    {loading ? <Loader/> : error ? <h1>{error?.message}</h1>
    :
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" >
       {data && <Searched sorterList={sorterList} sortOrder={sortOrder}  route={`/products/category/${category}?id=${id}&`} products={data?.productCategory.products} result={category}/>}
     {data?.productCategory.maxPage > 1 &&<Pagination marginPages={1} pageRange={2} initialPage={data?.productCategory.curPage - 1} pageCount={data?.productCategory.maxPage} />}
   </Box>
    }
     {data && <Footer/>}
    </>
  )
}