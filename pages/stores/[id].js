import {  gql  } from "@apollo/client";
import Homepage from "../../components/store/Stores";
import { initializeApollo } from "../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
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
  await apolloClient.query({
    query:STORES,
    variables:{curPage:id || "1"}
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState} };
}

export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const { data, loading } = useQuery( STORES,{variables:{curPage:id }} );
  return (
    <div >
      <Homepage  data={data} loading={loading}/>
    </div>
  )
}