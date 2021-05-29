import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import GetCartInfo from "../../../components/product/GetCartInfo";
import Cookies from 'js-cookie';
export const CARTINFO = gql`
 query ($curPage:String!){
    getCartInfo(curPage:$curPage){
     curPage
      maxPage
      productCount
      cart{
        id
        quantity
        date
        productName
        image
        price
        storeName
        storeOwner
      }
    }
  }
`;
export async function getServerSideProps({req,query }) {
  const {id}=query
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
        query:CARTINFO,
        variables:{curPage:id || "1"},
        context:{headers:{
            token:req.cookies.blackedmarket || " "
        }}
      });
  } catch (error) {
      console.log(error)
  }
  
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState  } };
}

export default function Home({initialApolloState}) {
    const router = useRouter()
    const {id}= router.query
    const { data,error,loading } = useQuery( CARTINFO,{variables:{curPage:id},context:{headers:{token:Cookies.get('blackedmarket') || ""}}});
    console.log(error?.message)
    console.log(data)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
     {data && <GetCartInfo cart={data?.getCartInfo}/>}
     
    </div>
  )
}
