import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import Profile from "../../components/user/Profile";
 const PROFILE = gql`
 {
    user{
      email
      id
      name
      profilePic
    }
  }
`;
export async function getServerSideProps({req }) {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
        query:PROFILE,
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
    const { data,error,loading } = useQuery( PROFILE);
    console.log(error?.message)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
     {data && <Profile user={data?.user}/>}
    </div>
  )
}
