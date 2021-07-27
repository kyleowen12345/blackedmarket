import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Box,Text,Link, Button  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import ProductForm from './ProductForm';
import ProductImage from './ProductImage';
import { useRouter } from "next/router"
const CREATEPRODUCT = gql`
mutation ($productName:String!,$price:String!,$productStocks:String!,$description:String!,$storeName:ID!){
    createProduct(productName:$productName,price:$price,productStocks:$productStocks,description:$description,storeName:$storeName){
      id
      image
      price
      productName
      
    }
  }
`;

const CreateProduct = ({storeNames}) => {
  const [ready,setReady]=useState(false)
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })
  const router = useRouter()
  const {id}= router.query
    const [createproduct,{data, loading,error }] = useMutation(CREATEPRODUCT,{ errorPolicy: 'all' });
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({productName,price,productStocks,description,storeName}) => {
        const {data}= await createproduct({variables:{productName:productName,price:price,productStocks:productStocks,description:description,storeName:storeName},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
        if(data) console.log(data)
       };
  useEffect(() => {
        setReady(true)
      }, [])
    return (
        <Box>
           {ready && <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,1,1,8]}  fontFamily="body" textAlign={"left"}>
           <Step label={"Step 1"} key={1} description={"Product Details"} >
                  <Text pl={[1,1,5,5,20]}fontSize="24px" fontWeight="bold">Product Details</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >This step is to give guidance for the user on how to finish all the steps and to verify if you are a seller.</Text>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <ProductForm register={register} loading={loading} error={error} errors={errors} storeNames={storeNames} nextStep={nextStep}/>
                  </form>
            </Step>
            <Step label={"Step 2"} key={2} description={"Product Image"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Upload Image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","500px"]}>Select an image and click finish.</Text>
                   <ProductImage productId={data?.createProduct.id} storeId={id}/>
              </Step>  
             </Steps>
             }
            {activeStep === 2 && 
       <Box display="flex"  flexDirection="column" ml="auto" mr="auto" p={[0,0,5,5]} px={[4,10,5,5,20]}>
         <Text fontSize="20px" fontWeight="bold">Woohoo! All steps completed!</Text>
         <NextLink href={`/stores/info/${data?.createProduct.id}`} passHref><Link color="blue.400" textDecoration="underline" fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Click here to visit your new product!!!</Link></NextLink>
      </Box>
      }
           <Button onClick={nextStep}>next</Button>
           <Button onClick={prevStep}>prev</Button>
        </Box>
    )
}

export default CreateProduct
