import React, {useEffect} from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon, 
} from '@chakra-ui/react';
import NextLink from 'next/link'
import { useState } from "react";
import { NextSeo } from "next-seo";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../lib/auth";

const NEWPASSWORD = gql`
mutation($token:String!,$password:String!){
    newPassword(token:$token,password:$password){
      token
    }
  }
`;
export default function Register() {
    const [nomatch,setNoMatch]=useState(false)
    const {userCookie} = useAuth()
    const router = useRouter()
    const { id } = router.query
    const [newpassword,{data, loading,error }] = useMutation(NEWPASSWORD,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();

    useEffect(() => {
      if(userCookie){
        return router.push('/')
      }  
    }, [userCookie])

    const onSubmit = async({password,confirm_password}) => {
      if(password != confirm_password){
        return setNoMatch(true)
      }else{
       return  await  newpassword({variables:{token:id,password:password}})   
      }
      
    };
    return (
      <>
      <Box  mx={'auto'} maxW={'lg'} py={[5,5,5,8,12]} px={[3,3,3,6]}>  
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} width={["100%","100%",""]} p={[4,4,4,8]}>
          <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={[4,4,4,6]}>
                <Stack  spacing={0}>
                   <Text fontSize={['lg','lg','xl','2xl','2xl']} fontWeight="bold">Reset your password</Text>
                   <Text pl={1} fontSize={['10px','10px','sm']} color={'gray'}>This is the last step make your password secure</Text>
                </Stack>
                         <FormControl id="password">
                             <FormLabel>Password</FormLabel>
                             <Input type='password'
                              {...register('password', {
                              required: 'this is required',
                              minLength: {
                              value: 3,
                              message: 'Min length is 5',
                              },
                              })} 
                              isInvalid={errors.password && errors.password.message}
                              errorBorderColor="crimson"
                              />
                              
                             <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
                        </FormControl>
                        <FormControl id="confirm_password">
                             <FormLabel>Confirm password</FormLabel>
                             <Input type='password'
                              {...register('confirm_password', {
                              required: 'this is required',
                              minLength: {
                              value: 3,
                              message: 'Min length is 5',
                              },
                              })} 
                              isInvalid={errors.password && errors.password.message}
                              errorBorderColor="crimson"
                              />
                              
                             <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
                        </FormControl>
                        <Stack spacing={[5,5,5,5,8]}>
                             {error && <Alert status="error" >
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
                              </Alert> }
                              {nomatch  && <Alert status="error" >
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>passwords did not match</Text>
                              </Alert> }
                              {data && <Alert status="success">
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>Reset password complete !!!</Text>
                              </Alert> }
                            <Button
                              bg={"#FC8E00"}
                              color={'white'}
                              _hover={{
                              bg: '#FEBD69',
                               }}
                               type="submit" disabled={loading||data}
                              isLoading={loading}
                             >
                                Submit
                             </Button>
                       </Stack>
                       <Box display="flex"  justifyContent="center">
                           <NextLink href={"/login"} passHref><Link  fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Go Back to Sign-in</Link></NextLink>
                       </Box>
                       
                 </Stack>
          </form>   
        </Box>
        
      </Box>


      <Footer/>


      <NextSeo
         title={'Reset Password | BlackedMarket'} 
         canonical='https://blackedmarket.vercel.app/resetpassword'
         description="It's not a big deal it happens." 
         openGraph={{
           url:'https://blackedmarket.vercel.app/resetpassword',
           title:'Reset Password | BlackedMarket',
           description:"It's not a big deal it happens.",
           images:[
             {
                url: 'https://res.cloudinary.com/kaking/image/upload/v1628817805/resetpass_h3e8z3.png',
                width: 200,
                height: 200,
                alt: 'Reset Password | BlackedMarket',
             }
                  ]
         }}
        twitter={{
          site:'BlackedMarket',
          cardType:'summary_large_image',
          handle:'Kyle Owen Ga'
        }} >
      </NextSeo>
    </>  
    );
  }