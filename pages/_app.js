import '../styles/globals.scss'
import "@fontsource/raleway/400.css"
import "@fontsource/open-sans/700.css"
import React, { useState,useEffect } from 'react'
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react"
import  {useApollo}  from "../src/apollo.ts";
import {AuthProvider} from '../lib/auth.js'
import {Global,css} from '@emotion/react'
import Navbar from '../components/Navbar/Navbar';
import theme from '../styles/theme';
const GlobalStyle = ({ children }) => {
  return (
    <>

      <Global
        styles={css`
          body{
            background-color: #EAEDED ;  
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
      <ChakraProvider theme={theme}  resetCSS>
      <GlobalStyle/>
      {ready && <Navbar/>}
       <Component {...pageProps} />
    </ChakraProvider >
    </AuthProvider>
    </ApolloProvider>
  
  )
}

export default MyApp
