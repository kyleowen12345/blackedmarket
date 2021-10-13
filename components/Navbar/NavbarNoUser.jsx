import React from 'react'
import {Box,
    Flex,
    Container,
    Link,
    Text,
    useDisclosure,
    useColorModeValue,
    IconButton,
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import {  FaStore,FaProductHunt} from "react-icons/fa"
  import { AiOutlineLogin } from "react-icons/ai"
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import SearchInput from './SearchInput'
import ReusableDrawer from './ReusableDrawer'

const NoUserLinks = [{name:'Stores',link:"/stores/1?sortOrder=storeName",icon:FaStore}, {name:'Products',link:"/products/1?sortOrder=productName",icon:FaProductHunt},{name:'Login',link:"/login",icon:AiOutlineLogin}];

const NavbarNoUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
  <>
    <Box bg={useColorModeValue('#000000', 'gray.900')} p={1} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
          {/* Burger Menu */}
          <IconButton size={'md'} icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff" id="humberger-icon"/>} display={{ lg: 'none' }} aria-label={'Open Menu'} onClick={isOpen ? onClose : onOpen} bg="#000000" />
          
          {/* Logo logic */}
          <Container display="flex"  alignItems="center"  width="300"  ml={["","","","","",0]} pl={["","","","","",0]}>
             <NextLink href="/" passHref><Link fontWeight="bold" fontSize={["lg","lg","3xl"]}  color="#ffffff">BlackedMarket</Link></NextLink>
           </Container>
      
           {/* Search and Links */}
           <Box display={{ base: 'none', lg: 'flex' }}>
            <SearchInput />
            </Box>
            <Container  display="flex" justifyContent="space-around" alignItems="center"  width="230px" display={{ base: 'none', lg: 'flex' }}>
                     <NextLink href="/stores/1?sortOrder=storeName" passHref><Link color="#ffffff" >Stores</Link></NextLink>
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/products/1?sortOrder=productName" passHref><Link  color="#ffffff">Products</Link></NextLink> 
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/login" passHref><Link   color="#ffffff">Login</Link></NextLink> 
           </Container>
           
          

           {/* Register */}
          <Container display="flex"  justifyContent="flex-end"  width={["44px","47px","47px","70px"]}  p={3} m={2} borderRadius={25}  mr={[1,1,1,1,1,0]} pr={[1,1,1,1,1,0]}>
               <NextLink href="/register" passHref><Link fontWeight="bold" fontSize={["xs","xs","md"]} color="#ffffff">Register</Link></NextLink>
            </Container>
         </Flex>
      </Box>

      {/* 768px Search input*/}
  
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} display={{ lg: 'none' }} width="100%">
          <SearchInput />
      </Box>

    </Box> 

    {/* <SubMenu/> */}
    {/* 768px Drawer */}
    <ReusableDrawer onClose={onClose} isOpen={isOpen} routes={NoUserLinks}/>
  </>
    )
}

export default NavbarNoUser
