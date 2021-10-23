import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { Box,Text,useToast  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import ProductForm from '../ReusableProductComponent/ProductForm/ProductForm';
import ProductImage from '../ReusableProductComponent/ProductForm/ProductImage';
import { useAuth } from '../../../lib/auth';

const CREATEPRODUCT = gql`
mutation ($productName:String!,$price:Int!,$productStocks:Int!,$description:String!,$storeName:ID!){
    createProduct(productName:$productName,price:$price,productStocks:$productStocks,description:$description,storeName:$storeName){
      id
      productName 
       price
       productStocks
       sold
       image
       description
       createdAt
       storeName{
         storeName
         id
       }
      }
  }
`;

const CreateProduct = ({storeNames}) => {
  const {authToken}=useAuth()
  const toast = useToast()
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })
    const [createproduct,{data, loading,error }] = useMutation(CREATEPRODUCT,{ errorPolicy: 'all',
     onCompleted:data =>{
       if(data){
        nextStep()
        toast({
          title: "Successfully created a product",
          description: 'Now you can add an image for your product.',
          status:"success",
          position:"top-right",
          isClosable: true,
        })
       }
     }
  });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({productName,price,productStocks,description,storeName}) => {
        const storeNamelist=storeNames.find(i=>i.storeName === storeName)
        if(storeNamelist){
           await createproduct({variables:{productName:productName,price:parseInt(price),productStocks:parseInt(productStocks),description:description,storeName:storeNamelist.id},context:{headers:{token:authToken || ""}}})
        } 
        
       };
 
    return (
        <Box >
           {storeNames && <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,6,6,8]}  fontFamily="body" textAlign={"left"}>
           <Step label={"Step 1"} key={1} description={"Product Details"} >
                  <Text pl={[1,1,5,5,20]}fontSize="24px" fontWeight="bold">Product Details</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >Please be careful on choosing store name.</Text>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <ProductForm register={register} data={data} loading={loading} error={error} errors={errors} storeNames={storeNames} nextStep={nextStep}/>
                  </form>
            </Step>
            <Step label={"Step 2"} key={2} description={"Product Image"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Upload Image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","500px"]}>Select an image and click finish.</Text>
                   <ProductImage productId={data?.createProduct.id} storeId={data?.createProduct.storeName.id} nextStep={nextStep}/>
              </Step>  
             </Steps>
             }
           
        </Box>
    )
}

export default CreateProduct
