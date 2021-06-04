import '../styles/globals.scss'
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
import Navbar from '../components/Navbar/Navbar';
import theme from '../styles/theme';
import { LoadProvider } from '../lib/loader';
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return(
   
    <ApolloProvider client={client}>
      <AuthProvider>
        <LoadProvider>
      <ChakraProvider theme={theme}  resetCSS>
       <Navbar/>
       <Component {...pageProps} />
    </ChakraProvider >
    </LoadProvider>
    </AuthProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
