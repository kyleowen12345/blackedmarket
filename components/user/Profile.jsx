import React from 'react'
import NextLink from 'next/link'
import { Box,Text,Link,Image} from "@chakra-ui/react"
const Profile = ({user}) => {
    return (
        <Box>
            
            <Image src={user?.profilePic} alt={user?.name} width={200} height={200}/>
            <p>{user?.email}</p>
            <p>{user?.name}</p>
            <NextLink href="/user/updateprofile"><a>Update Profile</a></NextLink>

        </Box>
    )
}

export default Profile
