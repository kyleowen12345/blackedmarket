import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router"
import UpdateStore from "../../../components/store/UpdateStore";
 const UPDATESTOREINFO = gql`
 query ($id:ID!){
    storeInfoUpdate(id:$id){
    id
    storeName
    storeAddress
    storeDescription
    storeType
    socialMediaAcc
    contactNumber
    storeBackgroundImage
  }
}
`;
export async function getServerSideProps({req,query }) {
  const apolloClient = initializeApollo();
  const {id}=query
  try {
    await apolloClient.query({
        query:UPDATESTOREINFO,
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
    const { data,error,loading } = useQuery(UPDATESTOREINFO,{variables:{id:id }});
    console.log(error?.message)
    console.log(data)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
       {data && <UpdateStore store={data?.storeInfoUpdate}/>}
    </div>
  )
}
