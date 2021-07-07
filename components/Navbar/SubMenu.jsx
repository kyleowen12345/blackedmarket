import React, { useState } from 'react'
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
  const [catergory,setCategory]=useState('Category')
    return (
      
          <Menu >
          <MenuButton color="#000000" fontSize="sm" fontWeight="bold"  width="80px" bg="#EAEDED" borderLeftRadius="5px" height="30px">
          <Container display="flex" alignItems="center" pl={1.5}>
          <Text fontSize="xs">Category</Text> <ChevronDownIcon color="#000000"/>
            </Container>
            </MenuButton>
                   <MenuList h="300px" overflowX="auto" whiteSpace="nowrap" css={{'&::-webkit-scrollbar': {width: "10px"},'&::-webkit-scrollbar-track': {background: "#f1f1f1"},'&::-webkit-scrollbar-thumb': {background: "#888", borderRadius: '24px',}}}>
                   <NextLink href="/products/category/Automotive?id=1&sortOrder=productName" passHref><MenuItem >Automotive</MenuItem></NextLink>
                   <NextLink href="/products/category/Baby & Toddler?id=1&sortOrder=productName" passHref><MenuItem>Baby & Toddler</MenuItem></NextLink>
                   <NextLink href="/products/category/Clothing & Shoes?id=1&sortOrder=productName" passHref><MenuItem>Clothing & Shoes</MenuItem></NextLink>
                   <NextLink href="/products/category/Computers?id=1&sortOrder=productName" passHref><MenuItem>Computers</MenuItem></NextLink>
                   <NextLink href="/products/category/Electronics?id=1&sortOrder=productName" passHref><MenuItem>Electronics</MenuItem></NextLink>
                   <NextLink href="/products/category/Entertainment & Arts?id=1&sortOrder=productName" passHref><MenuItem>Entertainment & Arts</MenuItem></NextLink>
                   <NextLink href="/products/category/Food & Gifts?id=1&sortOrder=productName" passHref><MenuItem>Food & Gifts</MenuItem></NextLink>
                   <NextLink href="/products/category/Health & Beauty?id=1&sortOrder=productName" passHref><MenuItem>Health & Beauty</MenuItem></NextLink>
                   <NextLink href="/products/category/Home & Garden?id=1&sortOrder=productName" passHref><MenuItem>Home & Garden</MenuItem></NextLink>
                   <NextLink href="/products/category/Travel?id=1&sortOrder=productName" passHref><MenuItem>Travel</MenuItem></NextLink>
                   <NextLink href="/products/category/Sports & Outdoors?id=1&sortOrder=productName" passHref><MenuItem>Sports & Outdoors</MenuItem></NextLink>
                   <NextLink href="/products/category/Software?id=1&sortOrder=productName" passHref><MenuItem>Software</MenuItem></NextLink>
                   <NextLink href="/products/category/Personal & Home Services?id=1&sortOrder=productName" passHref><MenuItem>Personal & Home Services</MenuItem></NextLink>
                   <NextLink href="/products/category/Office & Professional Services?id=1&sortOrder=productName" passHref><MenuItem>Office & Professional Services</MenuItem></NextLink>
                   <NextLink href="/products/category/Restaurants & Dining?id=1&sortOrder=productName"passHref><MenuItem>Restaurants & Dining</MenuItem></NextLink>
                   </MenuList>
            </Menu>
           
    )
}

export default SubMenu
