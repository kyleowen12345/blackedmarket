import React from 'react'
import { Box,Text} from "@chakra-ui/react"
import ProfileForm from './UserProfile/ProfileForm'
import ProfileDetails from './UserProfile/ProfileDetails'
import ProfileImage from './UserProfile/ProfileImage'
import { useRouter } from "next/router"
const Profile = ({user}) => {
  const router = useRouter()
  const {page}= router.query
    return (
        <Box width={["100%","100%","100%","100%","80%"]} bg="white" boxShadow="md"  borderRadius={5}>
            <Box py={4} mx={8} borderBottom="1px solid #EFEFEF">
            <Text fontSize="20px" fontWeight="bold">My Profile</Text>
            <Text>Manage your account</Text>
            </Box>
            {
              page =="update" ?  <ProfileForm user={user}/> 
              :
            <Box display="flex" flexDirection={["column-reverse","column-reverse","column-reverse","row"]}>
           <ProfileDetails user={user}/>
           <ProfileImage user={user}/>
           </Box> 
            
            }
        </Box>
    )
}

export default Profile
