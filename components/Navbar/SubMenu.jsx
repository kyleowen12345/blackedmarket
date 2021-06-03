import React from 'react'
import {
    Box,
    Flex,
    Input,
    Container,
    Link,
    Text,
    useDisclosure,
    useColorModeValue,
    IconButton,
    Drawer, 
    DrawerOverlay,
    DrawerHeader, 
    DrawerBody, 
    DrawerContent,
    DrawerCloseButton, 
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon 
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { ChevronDownIcon } from '@chakra-ui/icons'

const SubMenu = () => {
    return (
      <Box bg="#000000"  overflowX="auto" whiteSpace="nowrap" >
        <Container display="flex" justifyContent="space-around" maxWidth={1000} minWidth={320}  borderTop="1px solid white" p={2}>
          <Menu>
          <MenuButton color="#ffffff" fontSize="sm" fontWeight="bold" pl={10}>Categories <ChevronDownIcon/></MenuButton>
                     <MenuList>
                   <MenuItem >Test</MenuItem>
                   </MenuList>
                </Menu>
       <Text color="#ffffff" fontSize="sm"  pl={5}>Latest Products</Text>
         <Text color="#ffffff" fontSize="sm"  pl={5} pr={5}>Today's Deal</Text>
        </Container>
      </Box>
    )
}

export default SubMenu
