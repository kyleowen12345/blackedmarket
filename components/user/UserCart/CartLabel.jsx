import React from 'react'
import { Box,Text} from "@chakra-ui/react"

const CartLabel = () => {
    return (
        <Box width="100%" bg="white" display={["none","none","none","flex"]} justifyContent="space-between" py={3} px={5} borderRadius={5} boxShadow="md">
            <Box >
                <Text fontWeight="bold"> Product</Text >
            </Box>
            <Box display="flex" justifyContent="space-between" width="70%">
                <Text fontWeight="bold" color="gray">
                    Price
                </Text >
                <Text fontWeight="bold" color="gray">
                    Quantity
                </Text>
                <Text fontWeight="bold" color="gray">
                    Shipping
                </Text>
                <Text fontWeight="bold" color="gray">
                    Total
                </Text>
                <Text fontWeight="bold" color="gray">
                    Action
                </Text>
            </Box>
        </Box>
    )
}

export default CartLabel
