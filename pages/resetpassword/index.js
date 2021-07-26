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
const RESETPASSWORD = gql`
mutation($email:String!){
    resetPassword(email:$email){
      token
    }
  }
`;
export default function Register() {
    const router = useRouter()
    const [resetpassword,{data, loading,error }] = useMutation(RESETPASSWORD,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({email}) => {
       await  resetpassword({variables:{email:email}})      
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
                   <Text pl={1} fontSize={['10px','10px','sm']} color={'gray'}>Enter your email to get started</Text>
                </Stack>
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
                        <Stack spacing={[5,5,5,5,8]}>
                             {error && <Alert status="error" maxW={["300px","300px","400px","500px"]}>
                                <AlertIcon />
                                <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
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