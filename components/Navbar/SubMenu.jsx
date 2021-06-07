import React from 'react'
import {
    Box,
    Container,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { ChevronDownIcon } from '@chakra-ui/icons'

const SubMenu = () => {
    return (
      <Box bg="#000000"  overflowX="auto" whiteSpace="nowrap" >
        <Container display="flex" justifyContent="space-around" maxWidth={1000} minWidth={320}  p={2}>
          <Menu >
          <MenuButton color="#ffffff" fontSize="sm" fontWeight="bold" pl={5} >Categories <ChevronDownIcon/></MenuButton>
                   <MenuList h="300px" overflowX="auto" whiteSpace="nowrap" css={{'&::-webkit-scrollbar': {width: "10px"},'&::-webkit-scrollbar-track': {background: "#f1f1f1"},'&::-webkit-scrollbar-thumb': {background: "#888", borderRadius: '24px',}}}>
                   <NextLink href="/products/category/Automotive?id=1"><MenuItem >Automotive</MenuItem></NextLink>
                   <NextLink href="/products/category/Baby & Toddler?id=1"><MenuItem>Baby & Toddler</MenuItem></NextLink>
                   <NextLink href="/products/category/Clothing & Shoes?id=1"><MenuItem>Clothing & Shoes</MenuItem></NextLink>
                   <NextLink href="/products/category/Computers?id=1"><MenuItem>Computers</MenuItem></NextLink>
                   <NextLink href="/products/category/Electronics?id=1"><MenuItem>Electronics</MenuItem></NextLink>
                   <NextLink href="/products/category/Entertainment & Arts?id=1"><MenuItem>Entertainment & Arts</MenuItem></NextLink>
                   <NextLink href="/products/category/Food & Gifts?id=1"><MenuItem>Food & Gifts</MenuItem></NextLink>
                   <NextLink href="/products/category/Health & Beauty?id=1"><MenuItem>Health & Beauty</MenuItem></NextLink>
                   <NextLink href="/products/category/Home & Garden?id=1"><MenuItem>Home & Garden</MenuItem></NextLink>
                   <NextLink href="/products/category/Travel?id=1"><MenuItem>Travel</MenuItem></NextLink>
                   <NextLink href="/products/category/Sports & Outdoors?id=1"><MenuItem>Sports & Outdoors</MenuItem></NextLink>
                   <NextLink href="/products/category/Software?id=1"><MenuItem>Software</MenuItem></NextLink>
                   <NextLink href="/products/category/Personal & Home Services?id=1"><MenuItem>Personal & Home Services</MenuItem></NextLink>
                   <NextLink href="/products/category/Office & Professional Services?id=1"><MenuItem>Office & Professional Services</MenuItem></NextLink>
                   <NextLink href="/products/category/Restaurants & Dining?id=1"><MenuItem>Restaurants & Dining</MenuItem></NextLink>
                   </MenuList>
                </Menu>
                <NextLink href="/latestproducts"><Link color="#ffffff" fontSize="sm"  pl={5}>Latest Products</Link></NextLink>
                <NextLink href="/todaysdeal"><Link color="#ffffff" fontSize="sm"  pl={5} pr={5}>Today's Deal</Link></NextLink>
        </Container>
      </Box>
    )
}

export default SubMenu
