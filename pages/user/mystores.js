import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import { Box} from "@chakra-ui/react"
import { useAuth } from '../../lib/auth';
import Loader from '../../components/Loader/Loader';
import Menu from '../../components/user/Menu';
import Following from '../../components/user/Following';
import SmallMenu from '../../components/user/SmallMenu';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';
import { NextSeo } from 'next-seo';
import UserStores from '../../components/user/UserStores';
import Pagination from '../../components/helpers/Pagination';

const MYSTORES = gql`
query MyStores($curPage:String!,$sortOrder:String!,$keyword:String){
  allMyStoresPaginated(curPage:$curPage,sortOrder:$sortOrder,keyword:$keyword){
    curPage
    maxPage
    storeCount
    stores{
      storeName
      id
      storeType
      createdAt
      storeBackgroundImage
    }
  }
}
`;

export default function Home() {
    const router = useRouter()
    const {userCookie,authToken,userData}=useAuth()
    const {id,sortOrder,keyword}= router.query
    const [mystores,{ data, loading,error } ]= useLazyQuery( MYSTORES,{variables:{curPage:id || "1",sortOrder:sortOrder, keyword:keyword },context:{headers:{token:authToken || ""}}} );
    useEffect(() => {
      if(id ){
        return mystores()
      }
}, [id])

  return (
    <>
    {loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/> 
    :
     <Box  mt={[0,0,0,0,5]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]} >
         {data &&
         <>
       <Menu data={userData}/>
       <SmallMenu />
       <UserStores stores={data?.allMyStoresPaginated.stores} sortOrder={sortOrder} maxPage={data?.allMyStoresPaginated.maxPage} curPage={data?.allMyStoresPaginated.curPage}/>
       </>
       }
     </Box>}
     
     {data && <Footer/>}

     <NextSeo
      title={`My Stores | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/user/mystores?id=${id}&sortOrder=${sortOrder}`}
      description="BlackedMarket bond diversification helps you improve your life"
      openGraph={{
        url:`https://blackedmarket.vercel.app/user/mystores?id=${id}&sortOrder=${sortOrder}`,
        title:`Cart | BlackedMarket`,
        description:"BlackedMarket bond diversification helps you improve your life",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `Cart | BlackedMarket`,
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