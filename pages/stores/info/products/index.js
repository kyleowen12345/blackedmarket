import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import SortedProducts from '../../../../components/store/storeInfo/SortedProducts/SortedProducts';
import Loader from '../../../../components/Loader/Loader';

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
console.log(data)
  return (
    <>
     {loading ? <Loader/>:<SortedProducts product={data?.storeProducts}/>}
    </>
  )
}