import {  gql } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
import { useQuery } from "@apollo/client";
import ProductLandingPage from "../components/product/ProductLandingPage"
import StoreLandingPage from "../components/store/StoreLandingPage"
const LANDINGPAGE = gql`
  query {
    landingpage{
      stores{
        id
        storeName
        storeType
        sellerName{
          email
        }
        storeBackgroundImage
      }
    products{
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
  }
`;


export default function Home({initialApolloState}) {
  const { data,error } = useQuery( LANDINGPAGE );
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
    <h1>Latest Products</h1>
   <ProductLandingPage products={data?.landingpage.products}/>
   <h1>Top Stores</h1>
   <StoreLandingPage stores={data?.landingpage.stores}/>
   </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query:LANDINGPAGE,
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState },revalidate:1 };
}