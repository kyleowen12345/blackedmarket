import React from 'react'
import { Box} from "@chakra-ui/react"
import CartList from './UserCart/CartList'
import CartLabel from './UserCart/CartLabel'
import Payment from './UserCart/Payment'
import SmallCartList from './UserCart/SmallCartList'

const Cart = () => {
    return (
        <Box width="100%" >
            <CartLabel/>
            <CartList  />
            <SmallCartList/>
            <Payment/>
        </Box>
    )
}

export default Cart
