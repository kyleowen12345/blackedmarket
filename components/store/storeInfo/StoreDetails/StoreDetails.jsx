import React from 'react'
import { Box,Text } from "@chakra-ui/react"
import Image from 'next/image'
import StoreDetailsGrid from '../Products/StoreDetailsGrid';
const StoreDetails = ({store}) => {
    return (
        <Box height="400px" bg="white"  mb={"300px"} boxShadow="md" id="details">
            <Text  size="2xl" mt={5}  pl={10} pt={5} fontWeight="bold" >About Store</Text>
           <Box display="flex" p={10} pt={5}>
                 <Image src={store.storeBackgroundImage} alt={store.storeName} width={300} height={300}/>
                 <StoreDetailsGrid store={store}/>
          </Box>
        </Box>
    )
}

export default StoreDetails
