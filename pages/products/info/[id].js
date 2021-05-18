import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import ProductInfo from "../../../components/product/ProductInfo";
import Link from 'next/link'
export const PRODUCTINFO = gql`
 query ($id:ID!){
    productInfo(id:$id){
      id
     productName 
      price
      productStocks
      sold
      image
      description
      createdAt
      storeName{
        storeName
      }
      storeOwner{
        id
        email
      }
    }
  }
`;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query:PRODUCTINFO,
      variables:{id:id}
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
  const { data,error,loading } = useQuery( PRODUCTINFO,{variables:{id:id }} );
  console.log(data)
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
      {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <ProductInfo product={data?.productInfo}/>}
    </div>
  )
}