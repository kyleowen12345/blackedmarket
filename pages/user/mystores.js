import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import { NextSeo } from 'next-seo';
import { Box} from "@chakra-ui/react"

import { useAuth } from '../../lib/auth';
import Loader from '../../components/Loader/Loader';
import Menu from '../../components/user/ReusableUserComponents/Menu';
import SmallMenu from '../../components/user/ReusableUserComponents/SmallMenu';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';
import UserStores from '../../components/user/UserStores/UserStores';


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
    const [mystores,{ data, loading,error } ]= useLazyQuery( MYSTORES,{variables:{curPage:id || "1",sortOrder:sortOrder, keyword:keyword },context:{headers:{token:authToken || ""}},fetchPolicy:"no-cache"} );
    useEffect(() => {
      if(!userCookie){
        return router.push('/login')
      }
      if(id){
        return mystores()
      }
}, [userCookie,id,keyword])

  return (
    <>
    {loading ? <Loader/> 
    : 
    error ? <Error message={error?.message}/> 
    :
     <Box  mt={[0,0,0,0,5]}  width={["100%","100%","100%","100%","95%",1200]} mr="auto" ml="auto"  display="flex" flexDirection={["column","column","column","column","row"]} >
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
        title:`My Stores | BlackedMarket`,
        description:"BlackedMarket bond diversification helps you improve your life",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `My Stores | BlackedMarket`,
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