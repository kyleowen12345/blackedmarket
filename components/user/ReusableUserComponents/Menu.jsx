import React from 'react'
import NextLink from 'next/link'

import { useRouter } from "next/router"
import { Box,Text,Link,Avatar, Stack,Icon} from "@chakra-ui/react"
import { AiOutlineEdit,AiOutlineUser,AiOutlineHistory } from "react-icons/ai"
import {  FaStore} from "react-icons/fa"
import {  RiChatFollowUpLine} from "react-icons/ri"




const Menu = ({data}) => {
  const router = useRouter()
  const path=router.route

    return (
        <Box display={["none","none","none","none","flex"]} flexDirection="column" width="20%" minH="500px" mt={5}>
        <Box display="flex" width="80%" height="100px"  >
           <Avatar size="lg" name={data?.name} src={data?.profilePic} />
        <Box alignItems="center" ml={5} mt={2}>
           <Text fontWeight="bold" maxW="108px" isTruncated>{data?.name}</Text>
           <NextLink href={"/user/profile?page=update"} passHref>
            <Link fontSize="13px" >Edit Profile</Link>
            </NextLink>
        </Box>
        </Box>
        <Stack spacing={5}>
        <NextLink href={"/user/profile"} passHref>
        <Link fontWeight="bold" color={path == "/user/profile" && "#FC8E00"}><Icon as={AiOutlineUser} mr={3} />Account</Link>
        </NextLink> 
        <NextLink href={'/user/mystores?id=1&sortOrder=storeName'}  passHref>
        <Link fontWeight="bold"  color={path == "/user/mystores" && "#FC8E00"}><Icon as={FaStore} mr={3} />My Stores</Link>
        </NextLink> 
        <NextLink href={'/user/purchases?id=1'}  passHref>
        <Link fontWeight="bold" color={path == "/user/purchases" && "#FC8E00"}><Icon as={AiOutlineHistory} mr={3} />Purchases</Link>
        </NextLink>
        <NextLink href={'/user/following?id=1'}  passHref>
        <Link fontWeight="bold" color={path == "/user/following" && "#FC8E00"}><Icon as={RiChatFollowUpLine} mr={3} />Following</Link>
        </NextLink>
        </Stack>
      </Box>
    )
}

export default Menu
