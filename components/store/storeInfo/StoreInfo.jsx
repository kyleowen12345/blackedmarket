import React from 'react'
import { Box,Text } from "@chakra-ui/react"
import StoreHeading from './Heading/StoreHeading'
import SubNavigation from './SubNavigation/SubNavigation'
import StoreProduct from './Products/StoreProduct'
import StoreDetails from './StoreDetails/StoreDetails'
const StoreInfo = ({store,product}) => {
    return (
        <Box >
            {/*Heading */}
            <StoreHeading store={store} product={product} />
            {/* Subnav */}
            <SubNavigation storeId={store.id}/>
            {/* Products */}
            <Text  size="2xl" bg="white" mt={10} mb={2} p={3} fontWeight="bold" boxShadow="md" id="products">Top Products</Text>
             <StoreProduct product={product}/>
             {/* Details */}
             <Text  size="2xl" bg="white" mt={10} mb={2} p={3} fontWeight="bold" boxShadow="md" id="products">Store Details</Text>
             <StoreDetails store={store}/>
        </Box>
    )
}

export default StoreInfo
