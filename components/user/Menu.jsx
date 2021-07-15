import React from 'react'
import { Box,Text,Link,Avatar, Stack,Icon} from "@chakra-ui/react"
import { AiOutlineEdit,AiOutlineUser,AiOutlineHistory } from "react-icons/ai"
import NextLink from 'next/link'
import { useRouter } from "next/router"
const Menu = ({data}) => {
  const router = useRouter()
  const path=router.route

    return (
        <Box display="flex" flexDirection="column" width="20%" mt={5}>
        <Box display="flex" width="80%" height="100px" justifyContent="space-between"  >
           <Avatar size="lg" name={data?.name} src={data?.profilePic} />
        <Box alignItems="center">
           <Text fontWeight="bold">{data?.name}</Text>
           <NextLink href={"/user/profile?page=update"} passHref>
            <Link fontSize="13px" ><Icon as={AiOutlineEdit} mr={3} />Edit Profile</Link>
            </NextLink>
        </Box>
        </Box>
        <Stack spacing={5}>
        <NextLink href={"/user/profile"} passHref>
        <Link fontWeight="bold" color={path == "/user/profile" && "#FC8E00"}><Icon as={AiOutlineUser} mr={3} />Account</Link>
        </NextLink>  
        <NextLink href={'/user/purchases?id=1'}  passHref>
        <Link fontWeight="bold" color={path == "/user/purchases" && "#FC8E00"}><Icon as={AiOutlineHistory} mr={3} />Purchases</Link>
        </NextLink>
        <Link fontWeight="bold"><Icon as={AiOutlineEdit} mr={3} />Following</Link>
        </Stack>
      </Box>
    )
}

export default Menu
