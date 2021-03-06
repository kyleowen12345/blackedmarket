import React from 'react'
import { Box,Link,} from "@chakra-ui/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"

const SmallMenu = () => {
    const router = useRouter()
    const path=router.route
    return (
        <Box display={["flex","flex","flex","flex","none"]} bg="white" justifyContent="space-between" position="sticky" top={0}  p={2} pt={3}  boxShadow="md" zIndex={999}  width="100%" height="40px" >
        <NextLink href={"/user/profile"} passHref>
        <Link fontWeight="bold" fontSize={["13px","14px","15px","16px"]} color={path == "/user/profile"  && "#FC8E00"}>Account</Link>
        </NextLink>  
        <NextLink href={'/user/mystores?id=1&sortOrder=storeName'}  passHref>
        <Link fontWeight="bold" fontSize={["13px","14px","15px","16px"]} color={path == "/user/mystores" && "#FC8E00"}>My Stores</Link>
        </NextLink>
        <NextLink href={'/user/purchases?id=1'}  passHref>
        <Link fontWeight="bold" fontSize={["13px","14px","15px","16px"]} color={path == "/user/purchases" && "#FC8E00"}>Purchases</Link>
        </NextLink>
        <NextLink href={'/user/following?id=1'}  passHref>
        <Link fontWeight="bold" fontSize={["13px","14px","15px","16px"]} color={path == "/user/following" && "#FC8E00"}>Following</Link>
        </NextLink>
      </Box>
    )
}

export default SmallMenu
