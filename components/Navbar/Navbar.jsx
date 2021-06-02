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
  DrawerCloseButton 
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { Search2Icon,HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
  
  const Links = ['Stores', 'Products'];

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
    <Box bg={useColorModeValue('#000000', 'gray.900')} p={1} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
            <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff"/>}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
                bg="#000000"
            />
           <Container
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="300"
           >
               <NextLink href="/"><Link  fontWeight="bold" fontSize="3xl" display={{ base: 'none', md: 'flex' }} color="#ffffff">BlackedMarket</Link></NextLink>
               <NextLink href="/"><Link href="/" fontWeight="bold" fontSize="lg" display={{ md: 'none' }} color="#ffffff">BlackedMarket</Link></NextLink>
           </Container>
           <Container display="flex" alignItems="center" bg="#ffffff" borderRadius="md" display={{ base: 'none', md: 'flex' }}>
               <Input bg="#ffffff" border="none"  focusBorderColor="none"/>
               <Search2Icon color="#000000" />
           </Container>
           <Container
             display={{ base: 'none', md: 'flex' }}
             justifyContent="space-around"
             alignItems="center"
             width="200"
           >
              <NextLink href="/stores/1"><Link color="#ffffff">Stores</Link></NextLink>
               <Text ml={2} mr={2} color="#ffffff">|</Text>
               <NextLink href="/products/1"><Link  color="#ffffff">Products</Link></NextLink> 
           </Container>
           <Container
             display={{ base: 'none', md: 'flex' }}
             justifyContent="space-around"
             alignItems="center"
             width="200"
           >
              <NextLink href="/login"><Link  fontSize="lg" color="#ffffff">Login</Link></NextLink> 
           </Container>
           <Container
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              width="300"
              bg="messenger.500"
              p={3}
              m={2}
              borderRadius={25}
           >
                <NextLink href="/register"><Link  fontWeight="bold" fontSize="lg" color="#ffffff" display={{ base: 'none', md: 'flex' }}>
                      Sign Up
                </Link></NextLink>
                <NextLink href="/register"><Link  fontWeight="bold" fontSize="sm" color="#ffffff" display={{ md: 'none' }}>
                      Sign Up
                </Link></NextLink>
            </Container>
         </Flex>
      </Box>
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} display={{ md: 'none' }}>
            <Container display="flex" alignItems="center" bg="#ffffff" borderRadius="md" >
                 <Input bg="#ffffff" border="none"  focusBorderColor="none" height="1.8em"/>
                  <Search2Icon color="#000000" />
             </Container>
      </Box>
    </Box> 
      <Drawer onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent bg="#000000">
        <DrawerCloseButton color="#ffffff"/>
          <DrawerHeader borderBottomWidth="1px" color="#ffffff">Basic Drawer</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column">
            {Links.map((link) => (
                <Link key={link} color="#ffffff" p={2}>{link}</Link>
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </div>
    )
}

export default Navbar
