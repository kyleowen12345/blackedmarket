import React from 'react'
import {Flex, Box,Spinner} from '@chakra-ui/react'

const Loader = () => {
    return (
     <Flex  alignItems="center" justifyContent="center" m={5} mt={10}>
       <Box bg="white" width="4rem" height="4rem" borderRadius="50%" display="flex" justifyContent="center" alignItems="center" boxShadow="lg">
          <Spinner thickness="4px" speed="0.85s" emptyColor="gray.300" size="xl" color="black" />
       </Box>
         
     </Flex>
    )
}

export default Loader
