import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import StoreDashBoard from "../../../components/store/StoreDashBoard";
export const MYSTORES = gql`
query paginate($curPage:String!) {
    myStores(curPage:$curPage){
      curPage
      maxPage
      storeCount
     stores{
      id
      storeName
      storeBackgroundImage
      storeType
    }
    }
  }
`;
export async function getServerSideProps({req,query}) {
  const { id } = query;
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query:MYSTORES,
      variables:{curPage:id || "1"},
      context:{headers:{
        token:req.cookies.blackedmarket || " "
    }}
    });
  } catch (error) {
    console.log(error)
  }
  
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState} };
}

export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const { data, loading,error } = useQuery( MYSTORES,{variables:{curPage:id }} );
  console.log(data)
  return (
    <div >
     {loading && <h1>Loading..</h1>}
    {error && <h1>{error?.message}</h1>}
     <StoreDashBoard mystore={data?.myStores}/>
    </div>
  )
}