import {  gql  } from "@apollo/client";
import { initializeApollo } from "../../src/apollo.ts";
import { useQuery } from "@apollo/client";
import Profile from "../../components/user/Profile";
import UpdateProfile from "../../components/user/UpdateProfile";
 const UPDATEPROFILE = gql`
 {
    user{
        name
        profilePic
        contactNumber
        country
        city
        SocialMediaAcc
        zipcode
    }
  }
`;
export async function getServerSideProps({req }) {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query({
        query:UPDATEPROFILE,
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
    const { data,error,loading } = useQuery( UPDATEPROFILE);
    console.log(error?.message)
    console.log(data)
  return (
    <div >
       {loading && <h1>Loading..</h1>}
       {error && <h1>{error?.message}</h1>}
     {/* {data && <Profile user={data?.user}/>} */}
     <UpdateProfile user={data?.user}/>
    </div>
  )
}
