import React from 'react'
import {
    Text,
    Flex,
    Container,
    Link,
    Avatar,
    Drawer, 
    DrawerOverlay,
    DrawerHeader, 
    DrawerBody, 
    DrawerContent,
    DrawerCloseButton,
    Icon,
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { AiOutlineLogout } from "react-icons/ai"
const ReusableDrawer = ({onClose,isOpen,routes,user,loading,signOut}) => {
    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="#ffffff" zIndex={9999}>
          <DrawerCloseButton color="#000000"/>
           {user ?
            <DrawerHeader borderBottomWidth="1px" color="#000000">
               <Flex display="flex" alignItems="center">
               <Avatar name={user?.name} src={user?.profilePic} mr={2}/>
               <Text  maxW={200} isTruncated>{user ? user?.name : "loading..." }</Text>  
               </Flex>
            </DrawerHeader>
               :
            <DrawerHeader borderBottomWidth="1px" color="#000000">BlackedMarket</DrawerHeader>}
             <DrawerBody display="flex" flexDirection="column" mt={5} >
               {routes.map((link) => (
                  <Container key={link.name} mb={10}> 
                      <Icon as={link.icon} color="#000000" fontSize="20px"/>
                      <NextLink key={link.name} href={link.link} passHref><Link fontSize="20px" color="#000000" p={2} onClick={onClose} >{link.name}</Link></NextLink>
                  </Container>
              ))}
              {user && <Container onClick={signOut}><Icon as={AiOutlineLogout} color="#000000" /><Link  fontSize="20px" color="#000000" p={2} >Log Out</Link></Container>}
             </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
}

export default ReusableDrawer
