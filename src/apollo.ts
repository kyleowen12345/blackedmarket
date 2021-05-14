import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    makeVar
  } from "@apollo/client";
  import { useMemo } from "react";
  import {Url} from './index'
  
  
  let apolloClient: ApolloClient<NormalizedCacheObject>;
  
  
  export const UserAuth = makeVar('');
  function createApolloClient() {
    return new ApolloClient({
      ssrMode: true,
      uri:  Url,
      cache: new InMemoryCache({
     typePolicies:{
       Query:{
       fields:{
         UserAuth:{
           read(){
             return UserAuth()
           }
         }
       }
     }
   }
      }),
    });
  }
  
  export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
  
    if (initialState) {
      _apolloClient.cache.restore(initialState);
    }
  
    if (typeof window === "undefined") return _apolloClient;
    apolloClient = apolloClient ?? _apolloClient;
  
    return apolloClient;
  }
  
  export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
  }