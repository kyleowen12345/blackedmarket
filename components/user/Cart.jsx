import React, { useEffect, useState } from 'react'
import { Box} from "@chakra-ui/react"
import CartList from './UserCart/CartList'
import CartLabel from './UserCart/CartLabel'
import Pagination from '../helpers/Pagination'
import { useCart } from '../../lib/cart'
const Cart = ({cart}) => {
    const {data}=useCart()
    return (
        <Box width="100%" >
            <CartLabel/>
            <CartList  />
            <Pagination  marginPages={1} pageRange={2} initialPage={data?.getCartInfo.curPage - 1} pageCount={data?.getCartInfo.maxPage}/>
        </Box>
    )
}

export default Cart
