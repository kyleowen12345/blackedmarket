import React from 'react'
import { Box } from "@chakra-ui/react"
import StoreHeadingDescription from './StoreHeadingDescription'
import StoreHeadingImage from './StoreHeadingImage'
const StoreHeading = ({store,product}) => {
    console.log(product)
    return (
        <Box display="flex"  bg="white"  p={5} pt={10} id="#">
            <StoreHeadingImage store={store}/>
           <StoreHeadingDescription product={product} store={store}/>
        </Box>
    )
}

export default StoreHeading
