import React from 'react'
import {Box,
    Flex,
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
    Icon,
    useMediaQuery
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import {  FaStore,FaProductHunt} from "react-icons/fa"
  import { AiOutlineLogin } from "react-icons/ai"
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import SearchInput from './SearchInput'

const NoUserLinks = [{name:'Stores',link:"/stores/1?sortOrder=storeName",icon:FaStore}, {name:'Products',link:"/products/1?sortOrder=productName",icon:FaProductHunt},{name:'Login',link:"/login",icon:AiOutlineLogin}];

const NavbarNoUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)")
    return (
  <div>
    <Box bg={useColorModeValue('#000000', 'gray.900')} p={1} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
          {/* Burger Menu */}
          <IconButton size={'md'} icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff"/>} display={{ xl: 'none' }} aria-label={'Open Menu'} onClick={isOpen ? onClose : onOpen} bg="#000000" />
          
          {/* Logo logic */}
         <Container display="flex" justifyContent="space-around" alignItems="center"  width="300"   ml={isLargerThan1200 && 0 } pl={isLargerThan1200 && 0}>
             <NextLink href="/" passHref><Link fontWeight="bold" fontSize="lg" display={{ md: 'none' }} color="#ffffff" >BlackedMarket</Link></NextLink>
             <NextLink href="/" passHref><Link fontWeight="bold" fontSize="3xl" display={{ base: 'none', md: 'flex' }} color="#ffffff">BlackedMarket</Link></NextLink>
           </Container> 
      
           {/* Search and Links */}
           <Box display={{ base: 'none', xl: 'flex' }}>
            <SearchInput width={"450px"} />
            </Box>
            <Container  display="flex" justifyContent="space-around" alignItems="center"  width="200" display={{ base: 'none', xl: 'flex' }}>
                     <NextLink href="/stores/1?sortOrder=storeName" passHref><Link color="#ffffff" >Stores</Link></NextLink>
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/products/1?sortOrder=productName" passHref><Link  color="#ffffff">Products</Link></NextLink> 
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/login" passHref><Link   color="#ffffff">Login</Link></NextLink> 
           </Container>
           
          

           {/* Register */}
          <Container display="flex"  justifyContent="flex-end"  width={["44px","47px","47px","70px","150px"]}  p={3} m={2} borderRadius={25}  mr={[1,1,1,1,1,0]} pr={[1,1,1,1,1,0]}>
               <NextLink href="/register" passHref><Link fontWeight="bold" fontSize={["xs","xs","md"]} color="#ffffff">Register</Link></NextLink>
            </Container>
         </Flex>
      </Box>

      {/* 768px Search input*/}
  
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} display={{ xl: 'none' }}>
          <SearchInput width={"99%"}/>
      </Box>

    </Box> 

    {/* <SubMenu/> */}
    {/* 768px Drawer */}
      <Drawer onClose={onClose} isOpen={isOpen} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="#ffffff" zIndex={9999}>
          <DrawerCloseButton color="#000000"/>
           <DrawerHeader borderBottomWidth="1px" color="#000000">BlackedMarket</DrawerHeader>
             <DrawerBody display="flex" flexDirection="column">
               {NoUserLinks.map((link) => (
                  <Container key={link.name} mb={5}> 
                      <Icon as={link.icon} color="#000000" />
                      <NextLink key={link.name} href={link.link} passHref><Link fontSize="md" color="#000000" p={2} onClick={onClose} >{link.name}</Link></NextLink>
                  </Container>
              ))}
             </DrawerBody>
        </DrawerContent>
      </Drawer>
  </div>
    )
}

export default NavbarNoUser
