import React from 'react'
import { Box,Text,Link,Button } from "@chakra-ui/react"

const StoreCount = ({data}) => {
    return (
        <Box width={["100%","100%","100%","30%"]} bg="white" height={["200px","200px","200px","300px"]} borderRadius={5} boxShadow="md" mr={5} textAlign="center" p={5} >
        <Text fontWeight="bold" height="10%">Total store count</Text>
        <Text fontWeight="bold" fontSize={["100px","100px","100px","150px"]} height="80%">{data?.storeCount}</Text>
        <Text  fontSize="12px" height="10%">According to the latest query result</Text>
  </Box>
    )
}

export default StoreCount

