import React from 'react'
import { Box } from "@chakra-ui/react"
import StoreHeadingDescription from './StoreHeadingDescription'
import StoreHeadingImage from './StoreHeadingImage'
const StoreHeading = ({store,product}) => {
    console.log(product)
    return (
        <Box display="flex"  bg="white"  p={5} pt={10}>
            <StoreHeadingImage store={store}/>
            {/* <Image src={store?.storeBackgroundImage} alt={store?.storeName} width={350} height={200}/> */}
           <StoreHeadingDescription product={product} store={store}/>
        </Box>
    )
}

export default StoreHeading
