import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return(
    <AuthProvider>
    <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
    </AuthProvider>
  )
}

export default MyApp
