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
const NEWPASSWORD = gql`
mutation($token:String!,$password:String!){
    newPassword(token:$token,password:$password){
      token
    }
  }
`;
export default function Register() {
    const [nomatch,setNoMatch]=useState(false)
    const router = useRouter()
    const { id } = router.query
    const [newpassword,{data, loading,error }] = useMutation(NEWPASSWORD,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({password,confirm_password}) => {
      if(password != confirm_password){
        return setNoMatch(true)
      }else{
       return  await  newpassword({variables:{token:id,password:password}})   
      }
      
    };
    return (
        <Box  mx={'auto'} maxW={'lg'} py={[5,5,5,8,12]} px={[3,3,3,6]}>  
         <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          width={["100%","100%",""]}
          p={[4,4,4,8]}>
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
                              })} />
                              
                             <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
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
                              })} />
                              
                             <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
                        </FormControl>
                        <Stack spacing={[5,5,5,5,8]}>
                             {error && <Alert status="error" maxW={["300px","300px","400px","500px"]}>
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
                              </Alert> }
                              {nomatch  && <Alert status="error" maxW={["300px","300px","400px","500px"]}>
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>passwords did not match</Text>
                              </Alert> }
                              {data && <Alert status="success"maxW={["300px","300px","400px","500px"]}>
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>Check your email to continue</Text>
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
    );
  }