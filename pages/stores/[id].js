import React, {useEffect} from 'react'
import {  gql  } from "@apollo/client";
import Stores from "../../components/store/PaginatedStores/Stores";
import { useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Loader from '../../components/Loader/Loader';
import { Box } from "@chakra-ui/react"
import Footer from '../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import Seo from '../../components/helpers/Seo';


export const STORES = gql`
query paginate($curPage:String!,$sortOrder:String!) {
    storespaginate(curPage:$curPage,sortOrder:$sortOrder){
      stores{
        id
        storeName
        storeBackgroundImage
        sellerName{
          id
          email
          name
        }
        createdAt
        storeType
      }
      curPage
      maxPage
      storeCount
    }
  }
`;
export default function Home() {
  const router = useRouter()
  const {id,sortOrder}= router.query
  const [stores,{ data, loading,error } ]= useLazyQuery( STORES,{variables:{curPage:id || "1",sortOrder:sortOrder }} );
  useEffect(() => {
    if(sortOrder || id){
      return stores()
    }else{
      return
    }
  }, [id,sortOrder])
  return (
    <>
    {loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/>
    :
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto" >
       {data && <Stores  data={data} loading={loading}/>}
    </Box>
    }

    {data && <Footer/>}

    <Seo 
    title={'Stores | BlackedMarket'} 
    url={'https://blackedmarket.vercel.app/stores/1?sortOrder=storeName'} 
    description={"We sell multiple types of products you've never seen before."} 
    />
     
    </>
  )
}