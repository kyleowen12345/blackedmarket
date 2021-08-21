import React from 'react'
import { Box,Text,Link,Stack } from "@chakra-ui/react"
import StoreHeading from './Heading/StoreHeading'
import SubNavigation from './SubNavigation/SubNavigation'
import StoreProduct from './Products/StoreProduct'
import StoreDetails from './StoreDetails/StoreDetails'
import NextLink from 'next/link'
import { useAuth } from '../../../lib/auth'
const StoreInfo = ({store,product,follower}) => {
    const {userData}=useAuth()
    return (
        <Box >

         
            {/*Heading */}
            <StoreHeading store={store} product={product} follower={follower}/>

            {/* Subnav */}
            <SubNavigation storeId={store.id}/>
         


            {/* Products Navigation*/}
         
            <Box bg="white" mt={20} mb={2} p={3} boxShadow="md" display="flex" alignItems="center" justifyContent="space-between" >
              <Text  size="2xl"  fontWeight="bold" >Latest Products</Text>
                 <NextLink href={`/stores/info/products?store=${store.id}&id=1&sortOrder=productName`} passHref>
                      <Link  fontSize={["10px","10px","10px","13px"]} color="#FC8E00" fontWeight="bold">View All</Link>
                 </NextLink>
            </Box>
            {/* Products */}
             <StoreProduct product={product}/>
         


             
             {/* Details */}
            
               <Text  size="2xl" bg="white" mt={20} mb={2} p={3} fontWeight="bold" boxShadow="md" id="products">Store Details</Text>
               <StoreDetails store={store}/>
         
        </Box>
    )
}

export default StoreInfo
