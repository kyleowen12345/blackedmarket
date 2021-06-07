import {  gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
import ProductLandingPage from "../components/product/ProductLandingPage"
import { Heading } from "@chakra-ui/react"
const LATESTPRODUCT = gql`
  query {
    latestProduct{
       id
      storeName{
        id
        storeName
      }
      productName
      price
      image
      description
    }
      
    }
  
`;


export default function Home() {
  const { data,error } = useQuery( LATESTPRODUCT );
  return (
    <>
    {/* {authToken ? <button onClick={signOut}>logout</button> : <Link href="/login"><a>Login</a></Link>}
    <br/>
    <Link href="/stores/createstore"><a>Create Stores</a></Link>
    <br/>
    <Link href="/stores/1"><a>Stores</a></Link>
    <br/>
    <Link href="/user/profile"><a>Profile</a></Link>
    <br/>
    <Link href="/products/1"><a>Products</a></Link> */}
    <Heading as="h1">Latest Products</Heading>
   <ProductLandingPage products={data?.latestProduct}/>
   </>
  );
}

export async function getStaticProps() {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query:LATESTPRODUCT,
    });
    const initialApolloState=apolloClient.cache.extract()
    return { props: {initialApolloState },revalidate:1 };
  }