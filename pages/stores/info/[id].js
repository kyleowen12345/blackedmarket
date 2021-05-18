import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import StoreInfo from "../../../components/store/StoreInfo";
import Link from 'next/link'
export const STORESINFO = gql`
 query ($id:ID!){
    storeInfo(id:$id){
      id
      storeName
      storeAddress
      storeDescription
      storeType
      sellerName{
        email
        name
      }
      socialMediaAcc
      contactNumber
      createdAt
      storeBackgroundImage
    }
  }
`;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
      query:STORESINFO,
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
  const { data, error,loading } = useQuery( STORESINFO,{variables:{id:id }} );
  console.log(data)
  return (
    <div >
      <Link href="/"><a>Home</a></Link>
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <StoreInfo store={data?.storeInfo}/>}
    </div>
  )
}