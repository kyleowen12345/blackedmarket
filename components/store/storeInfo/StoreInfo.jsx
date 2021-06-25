import React from 'react'
import { Box } from "@chakra-ui/react"
import StoreHeading from './Heading/StoreHeading'
import SubNavigation from './SubNavigation/SubNavigation'
const StoreInfo = ({store,product}) => {
    return (
        <Box >
            {/*Heading */}
            <StoreHeading store={store} product={product}/>
           
            {/* Subnav */}
            <SubNavigation />
            {/* Details & Products */}
            <p>{store?.storeName}</p>
            <p>{store?.storeType}</p>
            <p>{store?.storeDescription}</p>
            <p>{store?.storeAddress}</p>
            <p>{store?.socialMediaAcc}</p>
            <p>{store?.contactNumber}</p>
        </Box>
    )
}

export default StoreInfo
