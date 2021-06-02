import '../styles/globals.scss'
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
import Navbar from '../components/Navbar/Navbar';
import theme from '../styles/theme';
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return(
   
    <ApolloProvider client={client}>
      <AuthProvider>
      <ChakraProvider theme={theme}  resetCSS>
       <Navbar/>
    <Component {...pageProps} />
    </ChakraProvider >
    </AuthProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
