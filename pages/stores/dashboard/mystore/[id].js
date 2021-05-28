import { initializeApollo } from "../../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import {STORESINFO} from "../../info/[id]"
import { useAuth } from "../../../../lib/auth";
import jwt_decode from "jwt-decode";
import StoreInfo from "../../../../components/store/StoreInfo";
import StoreProduct from "../../../../components/product/StoreProduct";
import DeleteStore from "../../../../components/store/DeleteStore";
import Link from 'next/link'
export async function getServerSideProps({req,query }) {
  const apolloClient = initializeApollo();
  const {id}=query
  try {
    await apolloClient.query({
        query:STORESINFO,
        variables:{id:id},
      });
  } catch (error) {
      console.log(error)
  }
  
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState  } };
}

export default function Home({initialApolloState}) {
    const router = useRouter()
    const {id}= router.query
    const { data,error,loading } = useQuery(STORESINFO,{variables:{id:id }});
    const {authToken}=useAuth()
    let decoded=null
    if(authToken){
        decoded=jwt_decode(authToken)
    }
    console.log(error?.message)
    console.log(data)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <StoreInfo store={data?.storeInfo.store} />}
       {decoded?.id === data?.storeInfo.store.sellerName.id && <DeleteStore storeId={data?.storeInfo.store.id}/>}
        <br/>
       {decoded?.id === data?.storeInfo.store.sellerName.id && <Link href={`/stores/updatestore/${data?.storeInfo.store.id}`}><a>Update</a></Link>}
        <br/>
        {decoded?.id === data?.storeInfo.store.sellerName.id && <Link href={`/stores/dashboard/createproduct/${data?.storeInfo.store.id}`}><a>create product</a></Link>}
       {data && <StoreProduct product={data?.storeInfo.products}/>}
    </div>
  )
}