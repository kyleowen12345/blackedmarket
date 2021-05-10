import {  gql  } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
export const STORES = gql`
query paginate($curPage:String!) {
    storespaginate(curPage:$curPage){
      stores{
        storeName
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
export async function getServerSideProps({ query }) {
  const page =query.page || 1
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query:STORES,
    variables:{curPage: page.toString()}
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState  } };
}

export default function Home({initialApolloState}) {
  console.log(initialApolloState)
  return (
    <div >
      
    </div>
  )
}
