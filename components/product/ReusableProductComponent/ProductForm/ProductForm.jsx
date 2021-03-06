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
  import { useRouter } from 'next/router'
import UpdateProductButton from './UpdateProductButton';


const ProductForm = ({register,data,loading,error,errors,storeNames,product,nextStep}) => {
  const router = useRouter()
  const StoreSelection=storeNames?.concat({id:"",storeName:""}).reverse()
    return (
        <Box py={5} px={[1,1,5,5,20]}>
            <Stack  spacing={[4,4,4,10]} >
                  <Box display={["block","block","flex"]} justifyContent="space-between" width="100%">    
                     <FormControl id="productname" width={["100%","100%","45%"]} mb={[3,3,0]}>
                        <Box display="flex">
                           <FormLabel >Product Name</FormLabel>
                           <Text color="red">*</Text>
                        </Box> 
                        <Input {...register("productName", {
                          required: 'this is  required',
                          minLength: {
                          value: 5,
                          message: 'Min length is 5',
                          },
                          })} 
                          isInvalid={errors.productName && errors.productName.message}
                          errorBorderColor="crimson"
                          />
                        <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.productName && errors.productName.message}</Text>
                     </FormControl>
                     <FormControl id="price" width={["100%","100%","45%"]}>
                        <Box display="flex">
                           <FormLabel >Price</FormLabel>
                           <Text color="red">*</Text>
                        </Box> 
                        <Input  type="number" {...register("price" ,{
                          required: 'this is  required'
                          })}
                          isInvalid={errors.price && errors.price.message}
                          errorBorderColor="crimson"
                          />
                        <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.price && errors.price.message}</Text>
                     </FormControl>
                 </Box>
                 <Box display={["block","block","flex"]} justifyContent="space-between" width="100%"> 
                    <FormControl id="stocks" width={["100%","100%","45%"]} mb={[3,3,0]}>
                          <Box display="flex">
                              <FormLabel >Product Stocks</FormLabel>
                              <Text color="red">*</Text>
                          </Box> 
                          <Input  type="number" {...register("productStocks",{
                          required: 'this is  required'
                          })}
                          isInvalid={errors.productStocks && errors.productStocks.message}
                          errorBorderColor="crimson"
                          />
                          <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.productStocks && errors.productStocks.message}</Text>
                    </FormControl>
                    <FormControl id="storename" width={["100%","100%","45%"]}>
                          <Box display="flex">
                               <FormLabel>Store Name</FormLabel>
                               <Text color="red">*</Text>
                          </Box>
                          <Select  {...register('storeName',{
                          required: 'this is  required',
                          
                          })} 
                          isInvalid={errors.storeName && errors.storeName.message}
                          errorBorderColor="crimson"
                          >
                              {StoreSelection?.map(i=>(
                              <option key={i.id} value={i.storeName} >{i.storeName}</option>
                              )) }
                          </Select>
                        
                          <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.storeName && errors.storeName.message}</Text>
                    </FormControl>
                </Box>
                <FormControl id="Description" >
                    <Box display="flex">
                       <FormLabel>Description</FormLabel>
                       <Text color="red">*</Text>
                    </Box>
                    <Textarea 
                      {...register('description', {
                      required: 'this is required',
                      minLength: {
                      value: 5,
                      message: 'Min length is 5',
                      },
                      })}
                      isInvalid={errors.description && errors.description.message}
                      errorBorderColor="crimson" 
                     />
                     <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.description && errors.description.message}</Text>
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
                    width={["30%","40%","40%","20%"]}
                    _hover={{
                    bg: '#FC8E00',
                    }}
                    type="submit" 
                    disabled={loading || data}
                    isLoading={loading}
                    >
                     Submit
                    </Button>
                    {
                      product &&
                      <UpdateProductButton loading={loading} nextStep={nextStep}/>
                    }
                </Box>
            </Stack> 
      </Box>
    )
}

export default ProductForm
