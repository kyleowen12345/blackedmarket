import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Purchases from "../../../components/user/Purchases";
 const PURCHASES = gql`
 query ($curPage:String!){
    getHistoryInfo(curPage:$curPage){
      curPage
      maxPage
      productCount
      history{
        name
        quantity
        id
        image
        price
        dateOfPurchase
        storeName
      }
    }
  }
`;
export async function getServerSideProps({req,query}) {
  const apolloClient = initializeApollo();
  const {id}=query
  try {
    await apolloClient.query({
        query:PURCHASES,
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

export default function Home() {
    const router = useRouter()
    const {id}= router.query
    const { data,error,loading } = useQuery( PURCHASES,{variables:{curPage:id}});
    console.log(error?.message)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       <h1>Purchases</h1>
       <Purchases history={data?.getHistoryInfo}/>
    </div>
  )
}