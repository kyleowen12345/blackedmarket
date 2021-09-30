import React from 'react'
import { Box} from "@chakra-ui/react"

import CartList from './CartList'
import CartLabel from './CartLabel'
import Payment from './Payment'
import SmallCartList from './SmallCartList'

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
