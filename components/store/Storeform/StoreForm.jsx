import React from 'react'
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
  import CreateStoreButtons from './CreateStoreButtons'
  import UpdateStoreButtons from './UpdateStoreButtons'
  
const StoreForm = ({register,loading,error,errors,prevStep,nextStep,data,store}) => {
  const options=["","Automotive","Baby & Toddler","Clothing & Shoes","Computers","Electronics","Entertainment & Arts","Food & Gifts","Health & Beauty","Home & Garden","Travel","Sports & Outdoors","Software","Personal & Home Services","Office & Professional Services","Restaurants & Dining"]
    return (
    <Box p={5} px={[1,1,5,5,20]} >
      <Stack spacing={[4,4,4,10]} align="center">
         <Box display={["block","block","flex"]} justifyContent="space-between" width="100%">
          <FormControl id="storename" width={["100%","100%","45%"]} mb={[3,3,0]}>
             <Box display="flex">
                <FormLabel >Store name </FormLabel>
                 <Text color="red">*</Text>
            </Box> 
            <Input 
            {...register('storeName', {
            required: 'this is  required',
            minLength: {
            value: 5,
            message: 'Min length is 5',
            },
            })}
            />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.storeName && errors.storeName.message}</Text>
          </FormControl>
          <FormControl id="storetype" width={["100%","100%","45%"]}>
            <Box display="flex">
                <FormLabel>Store type</FormLabel>
                <Text color="red">*</Text>
            </Box>
            <Select
            {...register('storeType', {
            required: 'this is  required',
            minLength: {
            value: 5,
            message: 'Min length is 5',
            },
            })}
            >
             {options.map(i=>(
                 <option key={i} value={i}>{i}</option>
             )) }
            </Select>
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.storeType && errors.storeType.message}</Text>
          </FormControl>
         </Box>
          <Box display={["block","block","flex"]} justifyContent="space-between" width="100%">
          <FormControl id="socialMediaAcc" width={["100%","100%","45%"]} mb={[3,3,0]}>
          <Box display="flex">
                <FormLabel>Social Media Account</FormLabel>
                <Text color="red">*</Text>
            </Box>
            <Input 
            {...register('socialMediaAcc', {
            required: 'this is required',
            minLength: {
            value: 5,
            message: 'Min length is 5',
            },
            })}
            />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.socialMediaAcc && errors.socialMediaAcc.message}</Text>
          </FormControl>
          <FormControl id="contactNumber" width={["100%","100%","45%"]}>
            <Box display="flex">
                <FormLabel>Contact number</FormLabel>
                <Text color="red">*</Text>
            </Box>
            <Input  type="number"
            {...register('contactNumber', {
            required: 'this is required',
            minLength: {
            value: 8,
            message: 'Min length is 5',
            },
            })}
            />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.contactNumber && errors.contactNumber.message}</Text>
          </FormControl>
         </Box>
         <FormControl id="storeAddress" >
            <Box display="flex">
                <FormLabel>Store address</FormLabel>
                <Text color="red">*</Text>
            </Box>
            <Input 
            {...register('storeAddress', {
            required: 'this is required',
            minLength: {
            value: 5,
            message: 'Min length is 5',
            },
            })}
            />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.storeAddress && errors.storeAddress.message}</Text>
          </FormControl>
          <FormControl id="storeDescription" >
            <Box display="flex">
                <FormLabel>storeDescription</FormLabel>
                <Text color="red">*</Text>
            </Box>
            <Textarea 
            {...register('storeDescription', {
            required: 'this is required',
            minLength: {
            value: 5,
            message: 'Min length is 5',
            },
            })}
            />
            <Text color="red" ml={2} fontSize={["12px","12px","12px","14px"]}>{errors.storeDescription && errors.storeDescription.message}</Text>
          </FormControl>
          {error && 
          <Alert status="error" w="100%">
            <AlertIcon />
            <Text fontSize={["12px","13px","14px","16px"]} isTruncated>{error.message}</Text>
          </Alert> 
          }
          <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
          <Button
            bg={"#FC8E00"}
            color={'white'}
            width={["30%","30%","30%","20%"]}
            _hover={{
            bg: '#FC8E00',
            }}
            ml={2}
            type="submit" 
            disabled={loading || data}
            isLoading={loading}
            >
             Submit
          </Button> 
          {
          store ? 
          <UpdateStoreButtons  loading={loading} nextStep={nextStep} />
          :
          <CreateStoreButtons prevStep={prevStep} loading={loading} nextStep={nextStep} data={data}/>
          }
          
           
          </Box>

       </Stack>
    </Box>
    )
}

export default StoreForm
