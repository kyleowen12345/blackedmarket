import React, {useEffect} from 'react'
import {  gql,useLazyQuery  } from "@apollo/client";
import { useRouter } from "next/router"
import Purchases from "../../components/user/Purchases";
import { Box} from "@chakra-ui/react"
import { useAuth } from '../../lib/auth';
import Loader from '../../components/Loader/Loader';
import Menu from '../../components/user/Menu';
import SmallMenu from '../../components/user/SmallMenu';
import Error from '../../components/Error/Error';
import Footer from '../../components/Footer/Footer';
import { NextSeo } from 'next-seo';
 const PURCHASES = gql`
 query ($curPage:String!,$keyword:String){
  getHistoryInfo(curPage:$curPage,keyword:$keyword){
    curPage
    maxPage
    productCount
    history{
      id
      price
      name
      quantity
      storeName
      dateOfPurchase
      storeOwner
      image
    }
  }
}
`;

export default function Home() {
  const {authToken,userData,userCookie}=useAuth()
    const router = useRouter()
    const {id,keyword}= router.query
    const [purchases,{ data,error,loading }] = useLazyQuery(PURCHASES,{variables:{curPage:id || "1",keyword:keyword},context:{headers:{token:authToken||""}}, fetchPolicy: "no-cache" });
    useEffect(() => {
       if(!userCookie){
         return router.push('/login')
       }else{
         return  purchases()
       }
  }, [userCookie])
  return (
    < >
      {loading ? <Loader/> 
      : 
      error ? <Error messasge={error?.message}/>
      :
       <Box  mt={[0,0,0,0,5]}  width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,0,0]} display="flex" flexDirection={["column","column","column","column","row"]}>
       { data && 
       <>
       <Menu data={userData}/>
       <SmallMenu />
       <Purchases history={data?.getHistoryInfo}/>
       </>
       }
       </Box>}

       {data && <Footer/>}

      <NextSeo
      title={`Purchases | BlackedMarket`}
      canonical={`https://blackedmarket.vercel.app/user/purchases?id=${id}`}
      description="BlackedMarket bond diversification helps you improve your life."
      openGraph={{
        url:`https://blackedmarket.vercel.app/user/purchases?id=${id}`,
        title:`Purchases | BlackedMarket`,
        description:"BlackedMarket bond diversification helps you improve your life.",
        images:[
          {
            url: 'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',
            width: 200,
            height: 200,
            alt: `Purchases | BlackedMarket`,
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