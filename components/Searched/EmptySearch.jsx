import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"
const EmptySearch = ({result}) => {
    return (
        <Box bg="white" width={["95%","95%","95%","95%","100%"]} height="300px" display="flex" justifyContent="center" alignItems="center" mx="auto" borderRadius={5} boxShadow="md">
            <Text fontSize="17px" fontWeight="bold">No results related to  "{result}"</Text>
        </Box>
    )
}

export default EmptySearch
