import '../styles/globals.scss'
import React, { useState,useEffect } from 'react'
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
import Navbar from '../components/Navbar/Navbar';
import theme from '../styles/theme';
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const [ready,setReady]=useState(false)
    useEffect(() => {
      setReady(true)
  }, [])
  return(
   
    <ApolloProvider client={client}>
      <AuthProvider>
      <ChakraProvider theme={theme}  resetCSS>
      {ready && <Navbar/>}
       <Component {...pageProps} />
    </ChakraProvider >
    </AuthProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
