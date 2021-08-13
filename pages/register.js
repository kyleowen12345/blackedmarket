import React, {useEffect} from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useAuth } from "../lib/auth";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon, 
} from '@chakra-ui/react';
import NextLink from 'next/link'
import Footer from "../components/Footer/Footer";
import { NextSeo } from 'next-seo';
const SIGNUP = gql`
mutation($name:String!,$email:String!,$password:String!){
    createUser(name:$name,email:$email,password:$password){
      token
    }
  }
`;
export default function Register() {
    const router = useRouter()
    const {signUp,userCookie}=useAuth()
    useEffect(() => {
      if(userCookie){
        return router.push('/')
      }  
    }, [userCookie])
    const [signup,{data, loading,error }] = useMutation(SIGNUP,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({name,email,password}) => {
            const{data}= await signup({variables:{name:name,email:email,password:password}})
            if(data){
            signUp(data?.createUser.token)
            router.push("/")
            }
    };
    return (
      <>
        <Box  mx={'auto'} maxW={'lg'} py={[5,5,5,8,12]} px={[3,3,3,6]}>
          
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} width={["100%","100%",""]} p={[4,4,4,8]}>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={[4,4,4,6]}>
                  <Stack  spacing={0}>
                     <Text fontSize={['lg','lg','xl','2xl','2xl']} fontWeight="bold">Create your account</Text>
                     <Text pl={0.5} fontSize={['10px','10px','sm']} color={'gray'}>once you go  <Link>blacked</Link> you never go back</Text>
                  </Stack>
                          <FormControl id="UserName">
                             <FormLabel>Username</FormLabel>
                             <Input 
                              {...register('name', {
                                required: 'this is required',
                                minLength: {
                                  value: 5,
                                  message: 'Min length is 5',
                                },
                              })}
                             />
                            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.name && errors.name.message}</Text>
                          </FormControl>
                          <FormControl id="email">
                             <FormLabel>Email address</FormLabel>
                             <Input type="email"
                             {...register('email', {
                             required: 'this is required',
                             pattern: {
                             value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                             message: 'Invalid email address',
                             },
                             })}
                             />
                            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
                          </FormControl>
                          <FormControl id="password">
                               <FormLabel>Password</FormLabel>
                               <Input type='password'
                                {...register('password', {
                                  required: 'this is required',
                                  minLength: {
                                    value: 5,
                                    message: 'Min length is 5',
                                  },
                                })} />
                                
                               <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
                          </FormControl>
                          <Stack spacing={[5,5,5,5,8]}>
                              <Stack
                               direction={'row'}
                               align={'start'}
                               justify={'space-between'}>
                                  <Checkbox ><Text fontSize={["12px","12px","14px","16px"]}>Remember me</Text></Checkbox>
                               </Stack>
                               {error && <Alert status="error" maxW={["300px","300px","400px","500px"]}>
                                  <AlertIcon />
                                  <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
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
                                  Sign up
                               </Button>
                         </Stack>
                         <Box display="flex"  justifyContent="center">
                             <NextLink href={"/login"} passHref><Link  fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Already have an account?</Link></NextLink>
                         </Box>
                         
                   </Stack>
            </form>   
          </Box>
         
        </Box>

        <Footer/>

        <NextSeo
          title={'Register | BlackedMarket'} 
          canonical='https://blackedmarket.vercel.app/register'
          description="Register now to diversify your bonds." 
          openGraph={{
             url:'https://blackedmarket.vercel.app/register',
             title:'Register | BlackedMarket',
             description:"Register now to diversify your bonds.",
             images:[
               {
                  url: 'https://res.cloudinary.com/kaking/image/upload/v1628816701/register_vytbzy.png',
                  width: 200,
                  height: 200,
                  alt: 'Register | BlackedMarket',
               }
                   ]
          }}
          twitter={{
          site:'BlackedMarket',
          cardType:'summary_large_image',
          handle:'Kyle Owen Ga'
          }}>
        </NextSeo>
      </>
    );
  }