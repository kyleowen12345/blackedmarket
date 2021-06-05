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
const NoUserLinks = [{name:'Stores',link:"/stores/1"}, {name:'Products',link:"/products/1"},{name:'Login',link:"/login"}];
const NavbarNoUser = () => {
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
               <NextLink href="/"><Link  fontSize="3xl" display={{ base: 'none', md: 'flex' }} color="#ffffff">BlackedMarket</Link></NextLink>
               <NextLink href="/"><Link href="/" fontSize="lg" display={{ md: 'none' }} color="#ffffff">BlackedMarket</Link></NextLink>
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
              <NextLink href="/stores/1" ><Link color="#ffffff" >Stores</Link></NextLink>
               <Text ml={2} mr={2} color="#ffffff">|</Text>
               <NextLink href="/products/1"><Link  color="#ffffff">Products</Link></NextLink> 
               <Text ml={2} mr={2} color="#ffffff">|</Text>
               <NextLink href="/login"><Link   color="#ffffff">Login</Link></NextLink> 
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
                <NextLink href="/register"><Link fontSize="lg" color="#ffffff" display={{ base: 'none', md: 'flex' }}>
                      Register
                </Link></NextLink>
                <NextLink href="/register"><Link fontSize="sm" color="#ffffff" display={{ md: 'none' }}>
                       Register
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
      <Drawer onClose={onClose} isOpen={isOpen} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="#ffffff">
          <DrawerCloseButton color="#000000"/>
           <DrawerHeader borderBottomWidth="1px" color="#000000">BlackedMarket</DrawerHeader>
             <DrawerBody display="flex" flexDirection="column">
            {NoUserLinks.map((link) => (
             <NextLink key={link.name} href={link.link}><Link fontSize="md" color="#000000" p={2} onClick={onClose} >{link.name}</Link></NextLink>
              ))}
             </DrawerBody>
        </DrawerContent>
      </Drawer>

     
        </div>
    )
}

export default NavbarNoUser
