import '../styles/globals.scss'
import { ApolloProvider } from "@apollo/client";
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return(
 
    <ApolloProvider client={client}>
      <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
