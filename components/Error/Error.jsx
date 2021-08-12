import React from 'react'
import {Box,Text,Icon,Stack,Link} from '@chakra-ui/react'
import { ImSad } from "react-icons/im"
import NextLink from 'next/link'

const Error = ({message}) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width={["95%","95%","95%","95%","95%",1200]} mx="auto" my={[3,3,3,3,20]} height="500px" bg="white" boxShadow="lg" borderRadius={5} border="1px solid black">
           <Box display={["block","block","block","block","flex"]} height="90%" alignItems="center" width="100%">
             <Box width={["100%","100%","100%","100%","40%"]} borderRight={["","","","","1px solid black"]} height={["50%","50%","50%","50%","90%"]} textAlign="center" px={5}>
                 <Icon as={ImSad}  width={["50px","50px","50px","50px","80px"]} height="80px" mt={[0,0,0,0,10]}/>
                <Text fontSize={["30px","30px","30px","30px","50px"]} fontWeight="bold" mb={5}>Something went wrong</Text>
                <NextLink href="/" passHref><Link as='a' fontWeight="bold" color="blue.500">Back to homepage.</Link></NextLink>
             </Box>
             <Box ml={[0,0,0,0,10]} textAlign={["center","center","center","center","left"]} maxW={["400px","400px","100%"]} px={4} isTruncated>
             {message && <Text fontWeight="bold" mb={5} color="red" fontSize={["20px","20px","20px","20px","23px"]} isTruncated>{message}</Text>}    
             <Text mb={5} fontSize={["18px","18px","18px","18px","20px"]} >Possible Solutions</Text> 

                <Stack spacing={4} fontSize={["15px","15px","15px","15px","17px"]}>
                <Text >1 - Check your internet connection.</Text> 
                <Text >2 - Reload the page.</Text>
                <Text >3 - Log-in again.</Text>
                </Stack> 
             </Box>
              
           </Box> 
            
        </Box>
    )
}

export default Error
