import React from 'react'
import {Flex,Spinner} from '@chakra-ui/react'

const Loader = () => {
    return (
     <Flex  alignItems="center" justifyContent="center" m={5} >
      <Spinner thickness="8px" speed="0.65s"emptyColor="gray.200" size="xl" />
     </Flex>
    )
}

export default Loader
