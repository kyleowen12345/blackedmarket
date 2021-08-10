import React from 'react'
import { Box,Text } from "@chakra-ui/react"

const ProductCount = ({data}) => {
    console.log(data)
    return (
        <Box width={["100%","100%","100%","30%"]} bg="white" height={["200px","200px","200px","300px"]}  borderRadius={5} boxShadow="md" mr={5} textAlign="center" p={5} >
          <Text fontWeight="bold" height="10%">Total products count</Text>
          <Text fontWeight="bold" fontSize={["100px","100px","100px","150px"]} height="80%">{data?.productCount}</Text>
          <Text  fontSize="12px" height="10%">According to the latest query result</Text>
    </Box>
    )
}

export default ProductCount
