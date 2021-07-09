import React from 'react'
import NextLink from 'next/link'
import { Box,Text,Link,Image,FormControl,FormLabel,Input,Stack,Button,Select} from "@chakra-ui/react"
import ProfileForm from './ProfileForm'
import ProfileDetails from './ProfileDetails'

const Profile = ({user}) => {
    return (
        <Box width="80%" bg="white">
            <Box py={4} px={8}>
            <Text fontSize="20px" fontWeight="bold">My Profile</Text>
            <Text>Manage your account</Text>
            </Box>
            
           {/* <ProfileDetails user={user}/> */}
           <ProfileForm user={user}/>

        </Box>
    )
}

export default Profile
