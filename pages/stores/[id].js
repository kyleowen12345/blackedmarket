import {  gql  } from "@apollo/client";
import Homepage from "../../components/store/Stores";
import { initializeApollo } from "../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Link from 'next/link'
export const STORES = gql`
query paginate($curPage:String!) {
    storespaginate(curPage:$curPage){
      stores{
        id
        storeName
        storeBackgroundImage
        sellerName{
          id
          email
          name
        }
        storeType
      }
      curPage
      maxPage
      storeCount
    }
  }
`;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query:STORES,
      variables:{curPage:id || "1"}
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
  const { data, loading,error } = useQuery( STORES,{variables:{curPage:id }} );
  console.log(loading)
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
      {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <Homepage  data={data} loading={loading}/>}
    </div>
  )
}