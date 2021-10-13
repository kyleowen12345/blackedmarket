import React from 'react'
import { Box,Text,Link} from "@chakra-ui/react"


const EmptyList = ({emptyData}) => {
    return (
        <Box  width={["95%","95%","95%","95%","100%"]} height="500px" display="flex" justifyContent="center" alignItems="center" mx="auto" >
            <Text fontSize="20px" fontWeight="bold">{emptyData}</Text>
        </Box>
    )
}

export default EmptyList
