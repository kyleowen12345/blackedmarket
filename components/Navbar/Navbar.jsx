import React,{useState,useEffect} from 'react'
import {
  Box,
  Flex,
  Container,
  Link,
  Text,
  useDisclosure,
  useColorModeValue,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Badge 
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { HamburgerIcon, CloseIcon,ChevronDownIcon } from '@chakra-ui/icons'
import {AiOutlineLogin, AiOutlineShoppingCart,AiOutlineDashboard,AiFillFolderAdd,AiOutlineLogout,AiOutlineAppstoreAdd } from "react-icons/ai"
import {  ImProfile} from "react-icons/im"
import {  FaStore,FaProductHunt} from "react-icons/fa"
import { useRouter } from 'next/router'
import SearchInput from './SearchInput'
import {useAuth} from '../../lib/auth'
import { useCart } from '../../lib/cart'
import ReusableDrawer from './ReusableDrawer'


const Navbar = () => {
    const {signOut,userCookie,userData,loading}=useAuth()
    const {data}=useCart()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()

   

  const WithUserLinks = [{name:'Profile',link:"/user/profile",icon:ImProfile},{name:'Dashboard',link:`/stores/dashboard`,icon:AiOutlineDashboard ,as:`/stores/dashboard`},{name:'Stores',link:"/stores/1?sortOrder=storeName",icon:FaStore}, {name:'Products',link:"/products/1?sortOrder=productName",icon:FaProductHunt},{name:'Create Store',link:"/stores/createstore",icon:AiFillFolderAdd},{name:'Create Product',link:"/products/createProduct",icon:AiOutlineAppstoreAdd}];
  const NoUserLinks = [{name:'Stores',link:"/stores/1?sortOrder=storeName",icon:FaStore}, {name:'Products',link:"/products/1?sortOrder=productName",icon:FaProductHunt},{name:'Login',link:"/login",icon:AiOutlineLogin}];
    return (
     <> 
   <div id="navbar">
      {/* {userCookie && ready ?  <NavbarWithUser signOut={signOut} user={userData} loading={loading}/> :<NavbarNoUser />} */}
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
          {/* Burger Menu */}
          <IconButton size={'md'} icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff" id="humberger-icon"/>} display={{ lg: 'none' }} aria-label={'Open Menu'} onClick={isOpen ? onClose : onOpen} bg="#000000" />
           
           {/* Logo */}
           <Container display="flex" justifyContent="space-around" alignItems="center"  width="300"  ml={["","","","","",0]} pl={["","","","","",0]}>
             <NextLink href="/" passHref><Link fontWeight="bold" fontSize={["lg","lg","3xl"]}  color="#ffffff" >BlackedMarket</Link></NextLink>
           </Container>

           {/* Search and user Menu */}
           <Box display={{ base: 'none', lg: 'flex' }}>
            <SearchInput  />
            </Box>
           {/* add loading state */}
           {userCookie && userData || userCookie && loading ? 
           <Container justifyContent="space-around" alignItems="center" width="200" display={{ base: 'none', lg: 'flex' }} id="usermenu">
              <Menu >
                 <MenuButton   bg="#000000">
                     <Flex display="flex" alignItems="center">
                        <Avatar name={userData?.name} src={userData?.profilePic} mr={2} size="sm" />
                             <Text  color="#ffffff" maxW={200} isTruncated>{userData ? userData?.name : "loading..." }</Text>
                              <ChevronDownIcon  color="#ffffff" fontWeight="bold" w={6} h={6}/>
                     </Flex>
                 </MenuButton>
                <MenuList>
                  {WithUserLinks.map((link) => (
                   <NextLink key={link.name} href={link.link} as={link.as} passHref><MenuItem as="a"><Icon as={link.icon} color="#000000" /><Text   fontSize="18px" color="#000000" p={2} >{link.name}</Text></MenuItem></NextLink>
                     ))}
                    <MenuItem onClick={signOut}><Icon as={AiOutlineLogout} color="#000000" /><Link  fontSize="18px" color="#000000" p={2} >Log Out</Link></MenuItem>
                </MenuList>
              </Menu>
           </Container>
           :
           <Container  display="flex" justifyContent="space-around" alignItems="center"  width="230px" display={{ base: 'none', lg: 'flex' }}>
                     <NextLink href="/stores/1?sortOrder=storeName" passHref><Link color="#ffffff" >Stores</Link></NextLink>
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/products/1?sortOrder=productName" passHref><Link  color="#ffffff">Products</Link></NextLink> 
                         <Text ml={2} mr={2} color="#ffffff">|</Text>
                     <NextLink href="/login" passHref><Link   color="#ffffff">Login</Link></NextLink> 
           </Container>
           }
          
            {/* Cart : Register */}
           {userCookie && userData || userCookie && loading ?
           <Container display="flex" justifyContent="space-around"  alignItems="center"  width="300" p={3} m={1} mr={[1,1,1,1,1,0]} pr={[1,1,1,1,1,0]} id="usercart">
                  <Link onClick={()=>router.push('/user/cart')}><Box position="relative" display="inline-block"><Badge size="sm" colorScheme="orange" position="absolute" top="-10px" right="-10px" borderRadius="50%">{data?.getCartInfo.productCount}</Badge><Icon as={AiOutlineShoppingCart} color="#ffffff" w={7} h={7}/></Box></Link> 
             </Container>
             :
             <Container display="flex"  justifyContent="flex-end"  width={["44px","47px","47px","70px"]}  p={3} m={2} borderRadius={25}  mr={[1,1,1,1,1,0]} pr={[1,1,1,1,1,0]}>
               <NextLink href="/register" passHref><Link fontWeight="bold" fontSize={["xs","xs","md"]} color="#ffffff">Register</Link></NextLink>
            </Container>
            }

        </Flex>
      </Box>
      {/* 768px Search input*/}
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} display={{ lg: 'none' }}>
          <SearchInput />
      </Box>
      
    </Box>
      {/* 768px UserDrawer */}
    <ReusableDrawer onClose={onClose} isOpen={isOpen} routes={userCookie && userData ? WithUserLinks : NoUserLinks} user={userCookie && userData ? userData : null} loading={userCookie && loading} signOut={userCookie && userData ? signOut : null}/>
    
      </div >

     </> 
    )
}

export default Navbar
