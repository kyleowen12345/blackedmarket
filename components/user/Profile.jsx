import React from 'react'
import NextLink from 'next/link'
import { Box,Text,Link,Image,FormControl,FormLabel,Input,Stack,Button,Select} from "@chakra-ui/react"
import ProfileForm from './ProfileForm'
import ProfileDetails from './ProfileDetails'
import ProfileImage from './ProfileImage'
import { useRouter } from "next/router"
const Profile = ({user}) => {
    const router = useRouter()
  const {page}= router.query
  console.log(page)
    return (
        <Box width="80%" bg="white">
            <Box py={4} mx={8} borderBottom="1px solid #EFEFEF">
            <Text fontSize="20px" fontWeight="bold">My Profile</Text>
            <Text>Manage your account</Text>
            </Box>
            {
              page =="update" ?  <ProfileForm user={user}/>
              :
              <Box display="flex">
           <ProfileDetails user={user}/>
           <ProfileImage user={user}/>
           </Box> 

            }
           
           

        </Box>
    )
}

export default Profile
