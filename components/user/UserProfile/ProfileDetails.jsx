import React from 'react'
import { Box,Text,Image,FormControl,FormLabel,Input,Stack,Button,Select, Icon} from "@chakra-ui/react"
import { AiOutlineEdit } from "react-icons/ai"
import NextLink from 'next/link'
const ProfileDetails = ({user}) => {
    return (
        <Box p={8}  width="60%">
            <Stack spacing={10}>
            <Box display="flex" alignItems="center">    
            <Text width="50%" textAlign="right" mr={4} fontSize="14px" color="#969696">Username</Text> 
            <Input  defaultValue={user.name} readOnly/>          
            </Box>    
            <Box  display="flex"  alignItems="center">
            <Text width="50%" textAlign="right" mr={4} fontSize="14px" color="#969696">Email</Text>  
            <Input  defaultValue={user.email} readOnly/>    
            </Box> 
            <Box  display="flex"  alignItems="center">
            <Text width="50%" textAlign="right" mr={4} fontSize="14px" color="#969696">Phone Number</Text>  
            <Input  defaultValue={user.contactNumber} readOnly/>  
            </Box>
            <Box  display="flex"  alignItems="center">
            <Text width="50%" textAlign="right" mr={4} fontSize="14px"  color="#969696">Social media account</Text> 
            <Input  defaultValue={user.SocialMediaAcc} readOnly/>   
            </Box>
            <Box  display="flex"  alignItems="center">
            <Text width="50%" textAlign="right" mr={4} fontSize="14px" color="#969696">Country</Text>
            <Input  defaultValue={user.country} readOnly/>      
            </Box>
            <Box  display="flex"  alignItems="center">
            <Text width="50%" textAlign="right" mr={4} fontSize="14px" color="#969696">City</Text> 
            <Input defaultValue={user.city} readOnly/>   
            </Box>
            <Box  display="flex"  alignItems="center">
            <Text width="50%" textAlign="right" mr={4} fontSize="14px" color="#969696">Zipcode</Text>
            <Input defaultValue={user.zipcode} readOnly/>      
            </Box>
            <NextLink href={"/user/profile?page=update"} passHref>
            <Button as="a" mt={5}  bg={'white'} color={"#FC8E00"} border="2px solid #FC8E00"   _hover={{color: '#FC8E00',bg:"white"}} ><Icon as={AiOutlineEdit} color="#FC8E00" mr={3}/>Edit Details</Button>
            </NextLink>
            </Stack>
        </Box>
    )
}

export default ProfileDetails
