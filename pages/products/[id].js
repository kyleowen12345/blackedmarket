import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import Link from 'next/link'
import Products from "../../components/product/Products";
export const PRODUCTS = gql`
query ($curPage:String!){
  productpaginate(curPage:$curPage){
    curPage
    productCount
    maxPage
    products{
      id
      productName
      price
      description
      image
      storeName{
       storeName
      }
      storeOwner{
        email
      }
    }
    
  }
}
`;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query:PRODUCTS,
    variables:{curPage:id || "1"}
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState} };
}

export default function Home() {
  const router = useRouter()
  const {id}= router.query
  const { data, loading,error } = useQuery( PRODUCTS,{variables:{curPage:id }} );
  console.log(data)
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
      {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <Products  data={data} />}
       
    </div>
  )
}