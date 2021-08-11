import React from 'react'
import {Box,Text} from '@chakra-ui/react'
const Error = ({message}) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Text>{message} </Text>
        </Box>
    )
}

export default Error
