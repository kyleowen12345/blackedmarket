import React, { useState } from 'react'
import { useMutation, gql } from "@apollo/client"
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
    Textarea,
    Select
  } from '@chakra-ui/react';
  import { useForm } from 'react-hook-form';
import { useAuth } from '../../lib/auth';
import { PROFILE } from '../../pages/user/profile';
import ConfirmUser from './ConfirmUser';
 
const UPDATEUSER = gql`
mutation ($name:String!,$email:String!,$contactNumber:String!,$country:String!,$city:String!,$SocialMediaAcc:String!,$zipcode:String!){
    updateUser(name:$name,email:$email,contactNumber:$contactNumber,country:$country,city:$city,SocialMediaAcc:$SocialMediaAcc,zipcode:$zipcode){
      name
    }
  }
`
const ProfileForm = ({user}) => {
   const {authToken}=useAuth()
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
   await  updateUser({variables:{name:name,email:email,contactNumber:contactNumber,country:country,city:city,SocialMediaAcc:SocialMediaAcc,zipcode:zipcode},context:{headers:{token:authToken || ""}},refetchQueries:[{query:PROFILE,context:{headers:{token:authToken || ""}}}]})
           
};
console.log(data)
console.log(loading)
console.log(error)
    return (
   <Box  py={4} px={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl id="storename" width={["100%","100%","50%"]}>
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
                  })}/>
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
          </FormControl>
          <FormControl id="storename" width={["100%","100%","50%"]}>
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
          <FormControl id="storename" width={["100%","100%","50%"]}>
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
          <FormControl id="storename" width={["100%","100%","50%"]}>
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
          <FormControl id="storename" width={["100%","100%","50%"]}>
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
          <FormControl id="storename" width={["100%","100%","50%"]}>
             <Box display="flex">
                <FormLabel >Zipcode</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input type="number" {...register("zipcode", {
            required: 'this is required'
            } )} />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.zipcode && errors.zipcode.message}</Text>
          </FormControl>
          {error && 
          <Alert status="error" w="100%">
            <AlertIcon />
            <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
          </Alert> 
          }
          
          {
            confirmedUser ?
            <Button 
            bg={"#FC8E00"}
            color={'white'}
            width={["30%","30%","30%","20%"]}
            _hover={{
            bg: '#FC8E00',
            }}
            ml={2}
            type="submit" 
            disabled={loading}
            isLoading={loading}
            >
             Save
          </Button>
          :
          <ConfirmUser setConfirmedUser={setConfirmedUser} confirmedUser={confirmedUser}/>
          }
          
        </Stack>
    </form>
    </Box> 
    )
}

export default ProfileForm
