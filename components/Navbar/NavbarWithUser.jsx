import React  from 'react'
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
    Icon 
  } from '@chakra-ui/react'
  import NextLink from 'next/link'
  import { Search2Icon,HamburgerIcon, CloseIcon,ChevronDownIcon } from '@chakra-ui/icons'
  import { AiOutlineShoppingCart,AiOutlineDashboard,AiFillFolderAdd,AiOutlineLogout } from "react-icons/ai"
  import {  ImProfile} from "react-icons/im"
  import {  FaStore,FaProductHunt} from "react-icons/fa"
  import { useRouter } from 'next/router'
  import SubMenu from './SubMenu'
  import SearchInput from './SearchInput'

  
const WithUserLinks = [{name:'Profile',link:"/user/profile",icon:ImProfile},{name:'DashBoard',link:"/stores/dashboard/1",icon:AiOutlineDashboard},{name:'Stores',link:"/stores/1",icon:FaStore}, {name:'Products',link:"/products/1",icon:FaProductHunt},{name:'Create Store',link:"/stores/createstore",icon:AiFillFolderAdd}];

const NavbarWithUser = ({signOut,user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    return (
        <div>
    <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
          {/* Burger Menu */}
          <IconButton size={'md'} icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff"/>} display={{ md: 'none' }} aria-label={'Open Menu'} onClick={isOpen ? onClose : onOpen} bg="#000000" />
           
           {/* Logo */}
           <Container display="flex" justifyContent="space-around" alignItems="center"  width="300">
             <NextLink href="/"><Link  fontSize="lg" display={{ md: 'none' }} color="#ffffff">BlackedMarket</Link></NextLink>
             <NextLink href="/"><Link  fontSize="3xl" display={{ base: 'none', md: 'flex' }} color="#ffffff">BlackedMarket</Link></NextLink>
           </Container>

           {/* Search and user Menu */}
           <Box display={{ base: 'none', md: 'flex' }}>
            <SearchInput width={"450px"} />
            </Box>
           
           <Container justifyContent="space-around" alignItems="center" width="200" display={{ base: 'none', md: 'flex' }}>
              <Menu >
                 <MenuButton   bg="#000000">
                     <Flex display="flex" alignItems="center">
                        <Avatar name={user.name} src={user.profilePic} mr={2} size="sm" />
                             <Text  color="#ffffff">{user.name}</Text>
                              <ChevronDownIcon  color="#ffffff" fontWeight="bold" w={6} h={6}/>
                     </Flex>
                 </MenuButton>
                <MenuList>
                  {WithUserLinks.map((link) => (
                   <MenuItem key={link.name}><Icon as={link.icon} color="#000000" /><NextLink href={link.link}><Link   fontSize="md" color="#000000" p={2} >{link.name}</Link></NextLink></MenuItem>
                     ))}
                    <MenuItem onClick={signOut}><Icon as={AiOutlineLogout} color="#000000" /><Link  fontSize="md" color="#000000" p={2} >Log Out</Link></MenuItem>
                </MenuList>
              </Menu>
           </Container>
          
            {/* Cart */}
           <Container display="flex" justifyContent="space-around"  alignItems="center"  width="300" p={2} m={1} >
                  <Link onClick={()=>router.push('/user/cart/1')}><Icon as={AiOutlineShoppingCart} color="#ffffff" w={7} h={7}/></Link> 
             </Container>

        </Flex>
      </Box>
      {/* 768px Search input*/}
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} display={{ md: 'none' }}>
          <SearchInput width={"300px"}/>
      </Box>
      
    </Box>

    <SubMenu/>
  {/* 768px UserDrawer */}
      <Drawer onClose={onClose} isOpen={isOpen} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="#ffffff">
          <DrawerCloseButton color="#000000"/>
           <DrawerHeader borderBottomWidth="1px" color="#000000">
               <Flex display="flex" alignItems="center">
               <Avatar name={user.name} src={user.profilePic} mr={2}/>
               {user.name}
               </Flex>
               </DrawerHeader>
             <DrawerBody display="flex" flexDirection="column">
            {WithUserLinks.map((link) => (
             <Container key={link.name} mb={5}> 
             <Icon as={link.icon} color="#000000" />
             <NextLink key={link.name} href={link.link}><Link fontSize="md" color="#000000" p={2} onClick={onClose}>{link.name}</Link></NextLink> 
             </Container>
              ))}
              <Container onClick={signOut}><Icon as={AiOutlineLogout} color="#000000" /><Link  fontSize="md" color="#000000" p={2} >Log Out</Link></Container>
             </DrawerBody>
        </DrawerContent>
      </Drawer>
        </div>
    )
}

export default NavbarWithUser
