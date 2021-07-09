import React from 'react'
import { Box,Text,Link,Avatar, Stack,Icon} from "@chakra-ui/react"
import { AiOutlineEdit,AiOutlineUser,AiOutlineHistory } from "react-icons/ai"
const Menu = ({data}) => {
    return (
        <Box display="flex" flexDirection="column" width="20%" >
        <Box display="flex" width="80%" height="100px" justifyContent="space-between" mb={10} borderBottom="1px solid gray">
           <Avatar size="lg" name={data?.user.name} src={data?.user.profilePic} />
        <Box alignItems="center">
           <Text fontWeight="bold">{data?.user.name}</Text>
            <Link fontSize="13px"><Icon as={AiOutlineEdit} mr={3} />Edit Profile</Link>
        </Box>
        </Box>
        <Stack spacing={5}>
        <Link fontWeight="bold"><Icon as={AiOutlineUser} mr={3} />My Account</Link>
        <Link fontWeight="bold"><Icon as={AiOutlineHistory} mr={3} />My Purchases</Link>
        <Link fontWeight="bold"><Icon as={AiOutlineEdit} mr={3} />Following</Link>
        </Stack>
      </Box>
    )
}

export default Menu
