import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client";
import  {useApollo}  from "../src/apollo.ts";
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return(
    <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
