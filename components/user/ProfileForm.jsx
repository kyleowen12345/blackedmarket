import React, { useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import Cookies from 'js-cookie';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    Alert,
    AlertIcon,
    Icon
  } from '@chakra-ui/react';
  import { useForm } from 'react-hook-form';
import { useAuth } from '../../lib/auth';
import { PROFILE } from '../../pages/user/profile';
import ConfirmUser from './ConfirmUser';
import { AiOutlineSave } from "react-icons/ai"
import { useRouter } from "next/router"

 
const UPDATEUSER = gql`
mutation ($name:String!,$email:String!,$contactNumber:String!,$country:String!,$city:String!,$SocialMediaAcc:String!,$zipcode:String!){
    updateUser(name:$name,email:$email,contactNumber:$contactNumber,country:$country,city:$city,SocialMediaAcc:$SocialMediaAcc,zipcode:$zipcode){
     user{
      email
      id
      name
      profilePic
      contactNumber
      country
      city
      SocialMediaAcc
      zipcode
      Seller
     }
    token
    }
  }
`
const ProfileForm = ({user}) => {
   const {authToken}=useAuth()
   const router = useRouter()
   const [confirmedUser,setConfirmedUser]=useState(false)
   const [updateUser,{data, loading,error }] = useMutation(UPDATEUSER,{ errorPolicy: 'all' });
   const { register, formState: { errors } , handleSubmit } = useForm({
      defaultValues: {
          name: user.name,
          email:user.email,
          contactNumber: user.contactNumber,
          SocialMediaAcc: user.SocialMediaAcc,
          country: user.country,
          city: user.city,
          zipcode: user.zipcode
        }
  });
  const onSubmit = async({name,email,contactNumber,country,city,SocialMediaAcc,zipcode}) => {
   const {data}=await  updateUser({variables:{name:name,email:email,contactNumber:contactNumber,country:country,city:city,SocialMediaAcc:SocialMediaAcc,zipcode:zipcode},context:{headers:{token:authToken || ""}},
   update(cache,{data}){
     if(data){
        cache.writeQuery({
           query:PROFILE,
           context:{headers:{token:authToken||" "}},
           data:{
              user:data.updateUser.user
           }
        })
     }
   }
})
   if(data){
      Cookies.set('blackedmarket', data.updateUser.token,{expires:1,secure:true})
      router.push('/user/profile')
   }  
};
    return (
   <Box  py={10} px={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={10}>
           <Box display="flex">
           <FormControl id="username" width={["100%","100%","50%"]} mr={5}>
             <Box display="flex">
                <FormLabel >User name </FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input
            {...register("name",{
               required:'this is required',
               minLength:{
               value:5,
               message:'Minimum length is 5'
               }
            })} 
            />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.name && errors.name.message}</Text>
          </FormControl>
          <FormControl id="email" width={["100%","100%","50%"]}>
             <Box display="flex">
                <FormLabel >Email</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input {...register("email",{
                  required: 'this is required',
                  pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address',
                  },
                  })} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
          </FormControl>
           </Box>
         
           <Box display="flex">
          <FormControl id="number" width={["100%","100%","50%"]} mr={5}>
             <Box display="flex">
                <FormLabel >Phone Number</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input type="number" {...register("contactNumber" ,{
               required:'this is required',
               minLength:{
               value:5,
               message:'Minimum length is 5'
               }
            })} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.contactNumber && errors.contactNumber.message}</Text>
          </FormControl>
          <FormControl id="socialmedia" width={["100%","100%","50%"]}>
             <Box display="flex">
                <FormLabel >Social media account</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input {...register("SocialMediaAcc" ,{
               required:'this is required',
               minLength:{
               value:5,
               message:'Minimum length is 5'
               }
            })} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.SocialMediaAcc && errors.SocialMediaAcc.message}</Text>
          </FormControl>
          </Box>

          <FormControl id="country" width={"100%"}>
             <Box display="flex">
                <FormLabel >Country</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input {...register("country" ,{
               required:'this is required',
               minLength:{
               value:5,
               message:'Minimum length is 5'
               }
            })} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.country && errors.country.message}</Text>
          </FormControl>
          <Box display="flex">
          <FormControl id="city" width={["100%","100%","50%"]} mr={5}>
             <Box display="flex">
                <FormLabel >City</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input {...register("city" ,{
               required:'this is required',
               minLength:{
               value:5,
               message:'Minimum length is 5'
               }
            })} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.city && errors.city.message}</Text>
          </FormControl>
          <FormControl id="zipcode" width={["100%","100%","50%"]}>
             <Box display="flex">
                <FormLabel >Zipcode</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input type="number" {...register("zipcode", {
            required: 'this is required'
            } )} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.zipcode && errors.zipcode.message}</Text>
          </FormControl>
          </Box>
          {error && 
          <Alert status="error" w="100%">
            <AlertIcon />
            <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
          </Alert> 
          }
          
          {
            confirmedUser ?
            <Button bg={'#FC8E00'} color={"white"}  borderRadius={0}  _hover={{bg: '#FC8E00',color:"white"}} type="submit" disabled={loading} isLoading={loading}><Icon as={AiOutlineSave} color="white" mr={3}/> Save Changes</Button>
          :
          <ConfirmUser setConfirmedUser={setConfirmedUser} />
          }
          
        </Stack>
    </form>
    </Box> 
    )
}

export default ProfileForm
