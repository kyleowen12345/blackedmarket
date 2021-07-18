import React from 'react'
import { Box,Text,Image,FormControl,FormLabel,Input,Stack,Button,Select, Icon} from "@chakra-ui/react"
import { AiOutlineEdit } from "react-icons/ai"
import NextLink from 'next/link'
const ProfileDetails = ({user}) => {
    return (
        <Box p={8}  width={["100%","100%","100%","60%"]}>
            <Stack spacing={5}>
            <Box display="flex" flexDirection="column" >    
            <Text  textAlign="left" mb={2} ml={2}  fontSize="14px" fontWeight="bold" >Username</Text> 
            <Input  defaultValue={user.name} readOnly/>          
            </Box>    
            <Box  display="flex" flexDirection="column">
            <Text textAlign="left" mb={2} ml={2} fontSize="14px" fontWeight="bold" >Email</Text>  
            <Input  defaultValue={user.email} readOnly/>    
            </Box> 
            <Box  display="flex" flexDirection="column">
            <Text textAlign="left" mb={2} ml={2} fontSize="14px" fontWeight="bold"  >Phone Number</Text>  
            <Input  defaultValue={user.contactNumber} readOnly/>  
            </Box>
            <Box  display="flex" flexDirection="column">
            <Text textAlign="left" mb={2} ml={2} fontSize="14px" fontWeight="bold" >Social media account</Text> 
            <Input  defaultValue={user.SocialMediaAcc} readOnly/>   
            </Box>
            <Box  display="flex" flexDirection="column">
            <Text textAlign="left" mb={2} ml={2} fontSize="14px" fontWeight="bold" >Country</Text>
            <Input  defaultValue={user.country} readOnly/>      
            </Box>
            <Box  display="flex" flexDirection="column">
            <Text textAlign="left" mb={2} ml={2} fontSize="14px" fontWeight="bold" >City</Text> 
            <Input defaultValue={user.city} readOnly/>   
            </Box>
            <Box  display="flex" flexDirection="column">
            <Text textAlign="left" mb={2} ml={2} fontSize="14px" fontWeight="bold" >Zipcode</Text>
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
