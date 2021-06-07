import React from 'react'
import {Box,
    Flex,
    Input,
    Container,
    Link,
    Text,
    useDisclosure,
    useColorModeValue,
    useMediaQuery,
    IconButton,
    Drawer, 
    DrawerOverlay,
    DrawerHeader, 
    DrawerBody, 
    DrawerContent,
    DrawerCloseButton,
    Icon
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import {  FaStore,FaProductHunt} from "react-icons/fa"
  import { AiOutlineLogin } from "react-icons/ai"
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
  import SubMenu from './SubMenu'
import SearchInput from './SearchInput'

const NoUserLinks = [{name:'Stores',link:"/stores/1",icon:FaStore}, {name:'Products',link:"/products/1",icon:FaProductHunt},{name:'Login',link:"/login",icon:AiOutlineLogin}];

const NavbarNoUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
  <div>
    <Box bg={useColorModeValue('#000000', 'gray.900')} p={1} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
          {/* Burger Menu */}
           {isSmallerThan768 &&  <IconButton size={'md'} icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff"/>} aria-label={'Open Menu'} onClick={isOpen ? onClose : onOpen} bg="#000000" />}
           
           {/* Logo */}
           <Container display="flex" justifyContent="space-around" alignItems="center"  width="300">
             {isSmallerThan768 ? <NextLink href="/"><Link  fontSize="lg"  color="#ffffff">BlackedMarket</Link></NextLink>:<NextLink href="/"><Link  fontSize="3xl" color="#ffffff">BlackedMarket</Link></NextLink>}
           </Container>

           {/* Search and Links */}
           { 
            isSmallerThan768 == false && <>
           {/* <Container display="flex" alignItems="center" bg="#ffffff" borderRadius="md" > */}
                   <SearchInput width={"450px"}/>
                    {/* <Input bg="#ffffff" border="none"  focusBorderColor="none"/>
                      <Search2Icon color="#000000" /> */}
           {/* </Container> */}
            <Container  display="flex" justifyContent="space-around" alignItems="center"  width="200">
                     <NextLink href="/stores/1" ><Link color="#ffffff" >Stores</Link></NextLink>
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/products/1"><Link  color="#ffffff">Products</Link></NextLink> 
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/login"><Link   color="#ffffff">Login</Link></NextLink> 
           </Container>
           </>
           }

           {/* Register */}
           <Container display="flex"  justifyContent="space-around" alignItems="center"  width="300" bg="messenger.500" p={3} m={2} borderRadius={25}  >
               {isSmallerThan768 ? <NextLink href="/register"><Link fontSize="sm" color="#ffffff" >   Register </Link></NextLink> : <NextLink href="/register"><Link fontSize="lg" color="#ffffff">Register</Link></NextLink>}
            </Container>
         </Flex>
      </Box>

      {/* 768px Search input*/}
      {isSmallerThan768 && 
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} >
          <SearchInput width={"300px"}/>
      </Box>}

    </Box> 

    <SubMenu/>
    {/* 768px Drawer */}
      <Drawer onClose={onClose} isOpen={isOpen} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="#ffffff">
          <DrawerCloseButton color="#000000"/>
           <DrawerHeader borderBottomWidth="1px" color="#000000">BlackedMarket</DrawerHeader>
             <DrawerBody display="flex" flexDirection="column">
               {NoUserLinks.map((link) => (
                  <Container key={link.name} mb={5}> 
                      <Icon as={link.icon} color="#000000" />
                      <NextLink key={link.name} href={link.link}><Link fontSize="md" color="#000000" p={2} onClick={onClose} >{link.name}</Link></NextLink>
                  </Container>
              ))}
             </DrawerBody>
        </DrawerContent>
      </Drawer>
  </div>
    )
}

export default NavbarNoUser
