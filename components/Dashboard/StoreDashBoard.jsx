import React from 'react'
import { Box,Text,Link,Button } from "@chakra-ui/react"
import StoreCount from './StoreCount'
import StoreStats from './StoreStats'
const StoreDashBoard = ({data}) => {
    return (
        <Box width="100%" display={["","","","flex"]} height={["500px","500px","500px","300px"]} my={5}>
            <StoreCount data={data}/>
            <StoreStats data={data}/>
        </Box>
    )
}

export default StoreDashBoard
