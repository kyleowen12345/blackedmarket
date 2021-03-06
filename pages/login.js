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
  useToast 
} from '@chakra-ui/react';
import Footer from "../components/Footer/Footer"
import NextLink from 'next/link'
import Seo from '../components/helpers/Seo';

const LOGIN = gql`
mutation($email:String!,$password:String!){
    login(email:$email,password:$password){
      token
    }
  }
`;
export default function Login() {
    const router = useRouter()
    const toast = useToast()
    const {Login,userCookie,userData}=useAuth()

    useEffect(() => {
      if(userCookie && userData){
        return router.push('/')
      }  
    }, [userCookie,userData])

    const [login,{data, loading,error }] = useMutation(LOGIN,{ errorPolicy: 'all',
    onCompleted: data => {
      if (data) {
        Login(data?.login.token)
        toast({
          title: `Log in successful.`,
          description:"Now you go do amazing stuff.",
          status:"success",
          position:"top-right",
          isClosable: true,
        })
        router.push("/")
      }
  } 
  });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({email,password}) => {
            await  login({variables:{email:email,password:password}})
    };
    return (
      <>
      <Box  mx={'auto'} maxW={'lg'} py={[5,5,5,8,20]} px={[3,3,3,6]}>
          
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} width={["100%","100%",""]} p={[4,4,4,8]}>
          <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={[4,4,4,6]}>
                <Stack  spacing={0}>
                   <Text fontSize={['lg','lg','xl','2xl','2xl']} fontWeight="bold">Sign in to your account</Text>
                   <Text pl={0.5} fontSize={['10px','10px','sm']} color={'gray'}>once you go  <Link>blacked</Link> you never go back</Text>
                </Stack>
                        <FormControl id="email">
                           <FormLabel>Email address</FormLabel>
                           <Input type="email"
                           {...register('email', {
                           required: 'this is required',
                           pattern: {
                           value: /^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                           message: 'Invalid email address',
                           },
                           })}
                           isInvalid={errors.email && errors.email.message}
                           errorBorderColor="crimson"
                           />
                          <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
                        </FormControl>
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
                        <Stack spacing={[5,5,5,5,8]}>
                            <Stack
                             direction={'row'}
                             align={'start'}
                             justify={'space-between'}>
                                <Checkbox ><Text fontSize={["12px","12px","14px","16px"]}>Remember me</Text></Checkbox>
                                <NextLink href={"/resetpassword"}><Link color={'blue.400'} fontSize={["12px","12px","14px","16px"]}>Forgot password?</Link></NextLink>
                             </Stack>
                             {error && <Alert status="error" >
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
                                Sign in
                             </Button>
                       </Stack>
                       <Box display="flex"  justifyContent="center">
                           <NextLink href={"/register"} passHref><Link  fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >No Account?</Link></NextLink>
                       </Box>
                       
                 </Stack>
          </form>   
        </Box>
       
      </Box>

      <Footer/>

     
      <Seo 
      title={'Login | BlackedMarket'}
      url={'https://blackedmarket.vercel.app/login'}
      description={"Login and explore how we can diversify your bonds."}
    />
    </>
    );
  }