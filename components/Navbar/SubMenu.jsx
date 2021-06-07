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
          <Menu>
          <MenuButton color="#ffffff" fontSize="sm" fontWeight="bold" pl={5} >Categories <ChevronDownIcon/></MenuButton>
                   <MenuList>
                   <MenuItem ><NextLink href="/products/category/Automotive?id=1"><Link>Automotive</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Baby & Toddler?id=1"><Link>Baby & Toddler</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Clothing & Shoes?id=1"><Link>Clothing & Shoes</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Computers?id=1"><Link>Computers</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Electronics?id=1"><Link>Electronics</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Entertainment & Arts?id=1"><Link>Entertainment & Arts</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Food & Gifts?id=1"><Link>Food & Gifts</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Health & Beauty?id=1"><Link>Health & Beauty</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Home & Garden?id=1"><Link>Home & Garden</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Travel?id=1"><Link>Travel</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Sports & Outdoors?id=1"><Link>Sports & Outdoors</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Software?id=1"><Link>Software</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Personal & Home Services?id=1"><Link>Personal & Home Services</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Office & Professional Services?id=1"><Link>Office & Professional Services</Link></NextLink></MenuItem>
                   <MenuItem ><NextLink href="/products/category/Restaurants & Dining?id=1"><Link>Restaurants & Dining</Link></NextLink></MenuItem>
                   </MenuList>
                </Menu>
       <Text color="#ffffff" fontSize="sm"  pl={5}>Latest Products</Text>
         <Text color="#ffffff" fontSize="sm"  pl={5} pr={5}>Today's Deal</Text>
        </Container>
      </Box>
    )
}

export default SubMenu
