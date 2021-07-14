import React from 'react'
import { Box,Text,Link,Avatar, Stack,Icon} from "@chakra-ui/react"
import { AiOutlineEdit,AiOutlineUser,AiOutlineHistory } from "react-icons/ai"
import NextLink from 'next/link'
import { useRouter } from "next/router"
const Menu = ({data}) => {
  const router = useRouter()
  const {page}=router.query

    return (
        <Box display="flex" flexDirection="column" width="20%" mt={5}>
        <Box display="flex" width="80%" height="100px" justifyContent="space-between"  >
           <Avatar size="lg" name={data?.user.name} src={data?.user.profilePic} />
        <Box alignItems="center">
           <Text fontWeight="bold">{data?.user.name}</Text>
           <NextLink href={"/user/profile?page=update"} passHref>
            <Link fontSize="13px"><Icon as={AiOutlineEdit} mr={3} />Edit Profile</Link>
            </NextLink>
        </Box>
        </Box>
        <Stack spacing={5}>
        <NextLink href={"/user/profile"} passHref>
        <Link fontWeight="bold" color={!page && "#FC8E00"}><Icon as={AiOutlineUser} mr={3} />My Account</Link>
        </NextLink>  
        
        <Link fontWeight="bold"><Icon as={AiOutlineHistory} mr={3} />My Purchases</Link>
        <Link fontWeight="bold"><Icon as={AiOutlineEdit} mr={3} />Following</Link>
        </Stack>
      </Box>
    )
}

export default Menu
