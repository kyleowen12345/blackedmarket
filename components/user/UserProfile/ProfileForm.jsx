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
    Icon,
    Link,
    useToast
  } from '@chakra-ui/react';
  import { useForm } from 'react-hook-form';
import { useAuth } from '../../../lib/auth';
import { PROFILE } from '../../../pages/user/profile';
import ConfirmUser from './ConfirmUser';
import { AiOutlineSave } from "react-icons/ai"
import { useRouter } from "next/router"
import NextLink from 'next/link'
 
const UPDATEUSER = gql`
mutation ($name:String!,$email:String!,$contactNumber:String!,$country:String!,$city:String!,$SocialMediaAcc:String!,$zipcode:String!){
    updateUser(name:$name,email:$email,contactNumber:$contactNumber,country:$country,city:$city,SocialMediaAcc:$SocialMediaAcc,zipcode:$zipcode){
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
}
`
const ProfileForm = ({user}) => {
   const {authToken}=useAuth()
   const router = useRouter()
   const toast = useToast()
   const [confirmedUser,setConfirmedUser]=useState(false)
   const [updateUser,{data, loading,error }] = useMutation(UPDATEUSER,{ errorPolicy: 'all',
     onCompleted:data =>{
        if(data){
         router.push('/user/profile')
         toast({
            title: "Successfully updated your profile",
            description: 'You can also update your profile image.',
            status:"success",
            position:"top-right",
            isClosable: true,
          })
        }
     }
});
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
   await  updateUser({variables:{name:name,email:email,contactNumber:contactNumber,country:country,city:city,SocialMediaAcc:SocialMediaAcc,zipcode:zipcode},context:{headers:{token:authToken || ""}},
   update(cache,{data}){
     if(data){
        cache.writeQuery({
           query:PROFILE,
           context:{headers:{token:authToken||" "}},
           data:{
              user:data.updateUser
           }
        })
     }
   }
})
};
    return (
   <Box  py={5} px={8}>
      <NextLink href="/user/profile" passHref>
           <Link as="a" color="blue.400" fontWeight="bold"> Go Back</Link> 
      </NextLink>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={10} mt={5}>
           <Box display="flex" flexDirection={["column","column","column","column","row"]}>
           <FormControl id="username" width={["100%","100%","100%","100%","50%"]} mr={5}>
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
            isInvalid={errors.name && errors.name.message}
            errorBorderColor="crimson" 
            />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.name && errors.name.message}</Text>
          </FormControl>
          <FormControl id="email" width={["100%","100%","100%","100%","50%"]} mt={[3,3,3,3,0]}>
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
                  })} 
                  isInvalid={errors.email && errors.email.message}
                  errorBorderColor="crimson" 
                  />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
          </FormControl>
           </Box>
         
           <Box display="flex" flexDirection={["column","column","column","column","row"]}>
          <FormControl id="number" width={["100%","100%","100%","100%","50%"]} mr={5}>
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
            })} 
            isInvalid={errors.contactNumber && errors.contactNumber.message}
            errorBorderColor="crimson"
            />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.contactNumber && errors.contactNumber.message}</Text>
          </FormControl>
          <FormControl id="socialmedia" width={["100%","100%","100%","100%","50%"]} mt={[3,3,3,3,0]}>
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
            })} 
            isInvalid={errors.SocialMediaAcc && errors.SocialMediaAcc.message}
            errorBorderColor="crimson"
            />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.SocialMediaAcc && errors.SocialMediaAcc.message}</Text>
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
            })} 
            isInvalid={errors.country && errors.country.message}
            errorBorderColor="crimson"
            />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.country && errors.country.message}</Text>
          </FormControl>
          <Box display="flex" flexDirection={["column","column","column","column","row"]}>
          <FormControl id="city" width={["100%","100%","100%","100%","50%"]} mr={5}>
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
            })} 
            isInvalid={errors.city && errors.city.message}
            errorBorderColor="crimson"
            />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.city && errors.city.message}</Text>
          </FormControl>
          <FormControl id="zipcode" width={["100%","100%","100%","100%","50%"]} mt={[3,3,3,3,0]}>
             <Box display="flex">
                <FormLabel >Zipcode</FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input type="number" {...register("zipcode", {
            required: 'this is required'
            } )} 
            isInvalid={errors.zipcode && errors.zipcode.message}
            errorBorderColor="crimson"
            />
            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.zipcode && errors.zipcode.message}</Text>
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
            <Button bg={'#FC8E00'} color={"white"}  _hover={{bg: '#FC8E00',color:"white"}} type="submit" disabled={loading} isLoading={loading}><Icon as={AiOutlineSave} color="white" mr={3}/> Save Changes</Button>
          :
          <ConfirmUser setConfirmedUser={setConfirmedUser} />
          }
        </Stack>
    </form>
    </Box> 
    )
}

export default ProfileForm
