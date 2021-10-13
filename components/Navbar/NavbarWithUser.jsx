import React  from 'react'
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
  import { AiOutlineShoppingCart,AiOutlineDashboard,AiFillFolderAdd,AiOutlineLogout,AiOutlineAppstoreAdd } from "react-icons/ai"
  import {  ImProfile} from "react-icons/im"
  import {  FaStore,FaProductHunt} from "react-icons/fa"
  import { useRouter } from 'next/router'
  import SearchInput from './SearchInput'
import { useCart } from '../../lib/cart'
import ReusableDrawer from './ReusableDrawer'

  
const WithUserLinks = [{name:'Profile',link:"/user/profile",icon:ImProfile},{name:'Dashboard',link:`/stores/dashboard`,icon:AiOutlineDashboard ,as:`/stores/dashboard`},{name:'Stores',link:"/stores/1?sortOrder=storeName",icon:FaStore}, {name:'Products',link:"/products/1?sortOrder=productName",icon:FaProductHunt},{name:'Create Store',link:"/stores/createstore",icon:AiFillFolderAdd},{name:'Create Product',link:"/products/createProduct",icon:AiOutlineAppstoreAdd}];

const NavbarWithUser = ({signOut,user,loading}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {data}=useCart()
    const router = useRouter()
    return (
        <div>
    <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} >     
      <Box  display="flex" justifyContent="center" alignItems="space-between">
        <Flex width={1200} alignItems="center" justifyContent="center">
          {/* Burger Menu */}
          <IconButton size={'md'} icon={isOpen ? <CloseIcon  color="#ffffff"/> : <HamburgerIcon  color="#ffffff" id="humberger-icon"/>} display={{ lg: 'none' }} aria-label={'Open Menu'} onClick={isOpen ? onClose : onOpen} bg="#000000" />
           
           {/* Logo */}
           <Container display="flex" justifyContent="space-around" alignItems="center"  width="300"  ml={["","","","","",0]} pl={["","","","","",0]}>
             <NextLink href="/" passHref><Link fontWeight="bold" fontSize={["lg","lg","3xl"]}  color="#ffffff">BlackedMarket</Link></NextLink>
           </Container>

           {/* Search and user Menu */}
           <Box display={{ base: 'none', lg: 'flex' }}>
            <SearchInput  />
            </Box>
           
           <Container justifyContent="space-around" alignItems="center" width="200" display={{ base: 'none', lg: 'flex' }} id="usermenu">
              <Menu >
                 <MenuButton   bg="#000000">
                     <Flex display="flex" alignItems="center">
                        <Avatar name={user?.name} src={user?.profilePic} mr={2} size="sm" />
                             <Text  color="#ffffff" maxW={200} isTruncated>{user ? user?.name : "loading..." }</Text>
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
          
            {/* Cart */}
           <Container display="flex" justifyContent="space-around"  alignItems="center"  width="300" p={2} m={1} mr={[1,1,1,1,1,0]} pr={[1,1,1,1,1,0]} id="usercart">
                  <Link onClick={()=>router.push('/user/cart')}><Box position="relative" display="inline-block"><Badge size="sm" colorScheme="orange" position="absolute" top="-10px" right="-10px" borderRadius="50%">{data?.getCartInfo.productCount}</Badge><Icon as={AiOutlineShoppingCart} color="#ffffff" w={7} h={7}/></Box></Link> 
             </Container>

        </Flex>
      </Box>
      {/* 768px Search input*/}
      <Box bg={useColorModeValue('#000000', 'gray.900')} p={2} display={{ lg: 'none' }}>
          <SearchInput />
      </Box>
      
    </Box>

  {/* 768px UserDrawer */}
    <ReusableDrawer onClose={onClose} isOpen={isOpen} routes={WithUserLinks} user={user} loading={loading} signOut={signOut}/>
        </div>
    )
}

export default NavbarWithUser
