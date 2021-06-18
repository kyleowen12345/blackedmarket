import React from 'react'
import { Box,Link  } from "@chakra-ui/react"
import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'

const ProductInfoSubNav = ({data,id}) => {
    return (
        <Box display={["none","none","none","flex","flex","flex"]} alignItems="center" mt={5} mb={3}>
        <NextLink href={'/'} passHref><Link color="rgb(6,116,231)" fontSize="12px">Blackedmarket</Link></NextLink>
        <ChevronRightIcon color="#000000" w={6} h={6}/>
        <NextLink href={`/stores/info/${data?.productInfo.product.storeName.id}`} passHref><Link  color="rgb(6,116,231)" fontSize="12px">{data?.productInfo.product.storeName.storeName}</Link></NextLink>
        <ChevronRightIcon color="#000000" w={6} h={6}/>
        <NextLink href={`/products/info/${id}`} passHref><Link fontSize="12px">{data?.productInfo.product.productName}</Link></NextLink>
      </Box>
    )
}

export default ProductInfoSubNav
