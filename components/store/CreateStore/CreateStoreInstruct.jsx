import React from 'react'
import { Box,Button,Text,Stack ,Alert,AlertIcon } from "@chakra-ui/react"
import { useMutation, gql } from "@apollo/client"
import {PROFILE} from '../../../pages/user/profile'
import { useAuth } from '../../../lib/auth';
const SELLER = gql`
mutation{
   seller{
    id
    email
    name
    }
  }
`;
const CreateStoreInstruct = ({nextStep,isSeller}) => {
   const [seller,{ error,loading }] = useMutation( SELLER,{ errorPolicy: 'all',
      onCompleted:data=>{
        if(data){
          nextStep()
        }
      } 
  });
   const {authToken}=useAuth()
   const handleSeller=async()=>{
    await seller({context:{headers:{token:authToken || ""}},refetchQueries:[{query:PROFILE,context:{headers:{token:authToken || ""}}}]})
   }
    return (
        <Box p={5} px={[1,1,5,5,20]}>
            <Stack spacing={6} mb={4}>
              <Box>
                <Text fontSize="22px" textDecoration="underline" mb={2}>
                  Here are the instructions to create your store properly
                </Text>
                <Stack spacing={4}>
                    <Box>
                      <Text fontSize="19px" >
                        * Become a seller
                      </Text>
                      <Text fontSize="14px">If this is the first time you need to become a seller, to do so you need to agree to the terms and conditions below.</Text> 
                    </Box>

                   <Box>
                      <Text fontSize="19px" >
                        * Complete the store details needed and submit 
                      </Text>
                      <Text fontSize="14px">After reading the instructions, you need to fill out all details we need to publish your store and continue.</Text>
                   </Box>

                   <Box>
                      <Text fontSize="19px">
                         * Select an image 
                      </Text>
                      <Text fontSize="14px">This step is to add an image for your store</Text>
                    </Box>
                </Stack>
              </Box>
            
           
              <Box>
                 <Text fontSize="22px" textDecoration="underline" mb={2}>
                   Reminders
                 </Text>
                 <Stack spacing={4}> 
                    <Text>
                       * If you are not a seller read the terms below and agree, to continue.
                    </Text>    
                    <Text>
                       * If you are on the second step you should submit the details you fill out to continue.
                    </Text>
                    <Text>
                    * If you don't select an image your store will have our default background image.
                    </Text>
                    <Text>
                    * If you are already a seller you can just go next.
                    </Text>
                  </Stack>
               </Box>
            
              <Box>
                 <Text fontSize="22px" textDecoration="underline" mb={2}>
                    Terms and Conditions
                 </Text>
                 <Stack spacing={4}>
                    <Text>
                       * By agreeing to this you can create stores and products 
                    </Text>    
                    <Text>
                       * By agreeing to this you can sell and buy products 
                    </Text>
                    <Text>
                      * By agreeing to this you are now a part of the Wu-tang financial 
                    </Text>
                    <Text>
                      * By agreeing to this you are willing to diversify your bonds  
                    </Text>
                    <Text>
                      * By agreeing to this you believe that "Cash Rules Everything Around Me C.R.E.A.M., get the money Dollar dollar bill, y'all"
                    </Text>
                 </Stack>
              </Box>
            
            </Stack>
            {error && 
          <Alert status="error" w="100%">
            <AlertIcon />
            <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
          </Alert> 
          }
            <Box display="flex" alignItems="center">
            {isSeller == true ? <Button
            onClick={nextStep}
            width={["30%","30%","30%","10%"]}
            ml="auto"
            mt={4}
            >
             Next
          </Button>
          :
          <Button
          bg={"#FC8E00"}
          color={'white'}
          width={["30%","30%","30%","20%"]}
          _hover={{
          bg: '#FC8E00',
          }}
          mt={4}
          onClick={handleSeller}
          isLoading={loading}
          >
           Agree
        </Button>
          }
            
          
          </Box> 
        </Box>
    )
}

export default CreateStoreInstruct
