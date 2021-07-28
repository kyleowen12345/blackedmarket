import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import ProductImage from './ProductImage';
import ProductForm from './ProductForm';
import Image from 'next/image'
import { Box,Text,Link, Button  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import NextLink from 'next/link'
const UPDATEPRODUCT = gql`
mutation ($id:ID!,$productName:String!,$price:Int!,$productStocks:Int!,$description:String!,$storeName:ID!){
    updateProduct(id:$id,productName:$productName,price:$price,productStocks:$productStocks,description:$description,storeName:$storeName){
    id
    productName
    }
  }
`;

const UpdateProduct = ({product,storeNames}) => {
    const [ready,setReady]=useState(false)
    const { nextStep, prevStep, activeStep } = useSteps({
      initialStep: 0,
    })
    const [updateproduct,{data, loading,error }] = useMutation(UPDATEPRODUCT,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm({
      defaultValues:{
        productName:product.productName,
        price:product.price,
        productStocks:product.productStocks,
        storeName:product.storeName.storeName,
        description:product.description,
      }
    });
    const onSubmit = async({productName,price,productStocks,description,storeName}) => {
     const {data}= await updateproduct({variables:{id:product.id,productName:productName,price:parseInt(price),productStocks:parseInt(productStocks),description:description,storeName:storeName},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
     if(data) console.log(data)
    };
    useEffect(() => {
      setReady(true)
    }, [])
    return (
      <Box>
        {ready && <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,1,1,8]}  fontFamily="body" textAlign={"left"}>
           <Step label={"Step 1"} key={1} description={"Product Details"} >
                  <Text pl={[1,1,5,5,20]}fontSize="24px" fontWeight="bold">Product details update</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >If you don't want to change store then select the current store writen below the store name input</Text>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <ProductForm register={register} data={data} loading={loading} error={error} errors={errors} storeNames={storeNames} nextStep={nextStep} product={product}/>
                  </form>
            </Step>
            <Step label={"Step 2"} key={2} description={"Product Image"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Upload Image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","500px"]}>Select an image and click finish.</Text>
                   <ProductImage productId={data?.updateProduct.id} storeId={product.storeName.id} nextStep={nextStep}/>
              </Step>  
             </Steps>
             }
            {activeStep === 2 && 
       <Box display="flex"  flexDirection="column" ml="auto" mr="auto" p={[0,0,5,5]} px={[4,10,5,5,20]}>
         <Text fontSize="20px" fontWeight="bold">Woohoo! All steps completed!</Text>
         <NextLink href={`/stores/info/${data?.updateProduct.id}`} passHref><Link color="blue.400" textDecoration="underline" fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Click here to visit your new product!!!</Link></NextLink>
      </Box>
      }
      </Box>
    )
}

export default UpdateProduct
