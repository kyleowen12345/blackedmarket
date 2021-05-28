import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import UpdateProduct from "../../../components/product/UpdateProduct";
 const UPDATEPRODUCTINFO = gql`
 query ($id:ID!){
    productInfoUpdate(id:$id){
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
           id
         }
         storeOwner{
           id
           email
         }
  }
}
`;
export async function getServerSideProps({req,query }) {
  const apolloClient = initializeApollo();
  const {id}=query
  try {
    await apolloClient.query({
        query:UPDATEPRODUCTINFO,
        variables:{id:id},
        context:{headers:{
            token:req.cookies.blackedmarket || " "
        }}
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
    const { data,error,loading } = useQuery(UPDATEPRODUCTINFO,{variables:{id:id }});
    console.log(error?.message)
    console.log(data)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <UpdateProduct product={data?.productInfoUpdate}/>} 
       
    </div>
  )
}
