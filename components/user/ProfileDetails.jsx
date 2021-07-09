import React from 'react'
import { Box,Text,Image,FormControl,FormLabel,Input,Stack,Button,Select} from "@chakra-ui/react"

const ProfileDetails = ({user}) => {
    return (
        <Box py={4} px={8}>
            <Stack spacing={10}>
            <Text>User name</Text>
            <Text>Email</Text>
            <Text>Phone Number</Text>
            <Text>Social media account</Text>
            <Text>Country</Text>
            <Text>City</Text>
            <Text>Zipcode</Text>
            </Stack>
        </Box>
    )
}

export default ProfileDetails
