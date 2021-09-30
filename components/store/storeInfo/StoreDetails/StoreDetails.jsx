import React from 'react'
import { Box,Text,Image } from "@chakra-ui/react"
import StoreDetailsGrid from '../StoreDetails/StoreDetailsGrid';
const StoreDetails = ({store}) => {
    return (
        <Box  bg="white" height={["100%","100%","100%","400px"]}  m={[2,2,0]}  boxShadow="md" id="details" display="flex" flexDirection="column" justifyContent="center" mb={5} borderRadius={5}>
            <Text  size="2xl"  p={[5,5,5,5,5,10]} pb={[0,0,0,0,0,5]} fontWeight="bold" >About Store</Text>
           <Box display={["block","block","block","flex"]} p={[5,5,10]} pt={[5,0,0,0]} pl={[5,5,5,5,5,10]} pr={[5,5,5,5,5,10]}>
                <Image src={store.storeBackgroundImage} alt={store.storeName} width={["100%","100%", "100%",300]} height={300} mr={2} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                 <StoreDetailsGrid store={store}/>
          </Box>
        </Box>
    )
}

export default StoreDetails
