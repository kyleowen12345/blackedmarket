import '../styles/globals.scss'
import "@fontsource/poppins/300.css"
import "@fontsource/open-sans/700.css"
import React, { useState,useEffect } from 'react'
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
import {Global,css} from '@emotion/react'
import Navbar from '../components/Navbar/Navbar';
import theme from '../styles/theme';
import { CartProvider } from '../lib/cart';
const GlobalStyle = ({ children }) => {
  return (
    <>

      <Global
        styles={css`
          body{
            background-color: #EAEDED  ;  
            scroll-behavior: smooth;
          }
        `}
      />
      {children}
    </>
  );
};
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const [ready,setReady]=useState(false)
    useEffect(() => {
      setReady(true)
  }, [])
  return(
   
    <ApolloProvider client={client}>
      <AuthProvider>
      <CartProvider>
      <ChakraProvider theme={theme}  resetCSS>
      <GlobalStyle/>
      {ready && <Navbar/>}
       <Component {...pageProps} />
    </ChakraProvider >
    </CartProvider> 
    </AuthProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
