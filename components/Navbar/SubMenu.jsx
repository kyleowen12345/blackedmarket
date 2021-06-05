import React from 'react'
import {
    Box,
    Container,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { ChevronDownIcon } from '@chakra-ui/icons'

const SubMenu = () => {
    return (
      <Box bg="#000000"  overflowX="auto" whiteSpace="nowrap" >
        <Container display="flex" justifyContent="space-around" maxWidth={1000} minWidth={320}  p={2}>
          <Menu>
          <MenuButton color="#ffffff" fontSize="sm" fontWeight="bold" pl={5} >Categories <ChevronDownIcon/></MenuButton>
                     <MenuList>
                   <MenuItem >Automotive</MenuItem>
                   <MenuItem >Baby & Toddler</MenuItem>
                   <MenuItem >Clothing & Shoes</MenuItem>
                   <MenuItem >Computers</MenuItem>
                   <MenuItem >Electronics</MenuItem>
                   <MenuItem >Entertainment & Arts</MenuItem>
                   <MenuItem >Food & Gifts</MenuItem>
                   <MenuItem >Health & Beauty</MenuItem>
                   </MenuList>
                </Menu>
       <Text color="#ffffff" fontSize="sm"  pl={5}>Latest Products</Text>
         <Text color="#ffffff" fontSize="sm"  pl={5} pr={5}>Today's Deal</Text>
        </Container>
      </Box>
    )
}

export default SubMenu
