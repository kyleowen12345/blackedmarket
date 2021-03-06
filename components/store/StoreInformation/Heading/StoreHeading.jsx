import React from 'react'
import { Box } from "@chakra-ui/react"
import StoreHeadingDescription from './StoreHeadingDescription'
import StoreHeadingImage from './StoreHeadingImage'
const StoreHeading = ({store,product,follower}) => {
    return (
        <Box display="flex"  bg="white" mt={[0,0,0,0,0,5]}  p={[0,0,0,2,5]} pt={[0,0,0,5]} id="#" boxShadow="md" borderTopRadius={5}>
            <StoreHeadingImage store={store} follower={follower}/>
           <StoreHeadingDescription product={product} store={store}/>
        </Box>
    )
}

export default StoreHeading
