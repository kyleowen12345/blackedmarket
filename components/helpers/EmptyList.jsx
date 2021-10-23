import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"


const EmptyList = ({emptyData}) => {
    return (
        <Box  width={["95%","95%","95%","95%","100%"]} height={["250px","250px","300px","400px","500px"]} display="flex" justifyContent="center" textAlign="center" alignItems="center" mx="auto" >
            <Text fontSize={["15px","15px","17px","19px"]} fontWeight="bold" isTruncated>{emptyData}</Text>
        </Box>
    )
}

export default EmptyList
