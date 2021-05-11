import {  gql  } from "@apollo/client";
import Homepage from "../components/Homepage";
import { initializeApollo } from "../src/apollo.ts";
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
export async function getServerSideProps({ query }) {
  const page =query.page || 1
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query:STORES,
    variables:{curPage: page.toString()}
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {page,initialApolloState  } };
}

export default function Home({page,initialApolloState}) {
 console.log(page)
  return (
    <div >
      <Homepage page={page}/>
    </div>
  )
}
