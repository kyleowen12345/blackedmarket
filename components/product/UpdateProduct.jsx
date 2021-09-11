import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import ProductImage from './ProductImage';
import ProductForm from './ProductForm/ProductForm';
import { Box,Text,Link, Button,Image  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import NextLink from 'next/link'
import { useAuth } from '../../lib/auth';
import { PRODUCTINFO } from '../../pages/products/info/[id]';
import { STORESINFO } from '../../pages/stores/info/[id]';
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
    const {authToken}=useAuth()
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
      const storeNamelist=storeNames.find(i=>i.storeName === storeName)
     if(storeNamelist) return await updateproduct({variables:{id:product.id,productName:productName,price:parseInt(price),productStocks:parseInt(productStocks),description:description,storeName:storeNamelist.id},context:{headers:{token:authToken || ""}},refetchQueries:[{query:PRODUCTINFO,variables:{id:product.id}},{query:STORESINFO,variables:{id:storeNamelist.id}}]})
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
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Edit image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","500px"]}>The image below is the current image of your product, select an image of your choice to change it and click finish.</Text>
                  <Box pl={[1,1,5,5,20]} mt={3}>
                  <Image src={product?.image} alt={product?.productName} width={200} height={200}/>
                  </Box>
                  <ProductImage productId={product.id} storeId={product.storeName.id} nextStep={nextStep} product={product} prevStep={prevStep}/>
              </Step>  
             </Steps>
             }
            {activeStep === 2 && 
       <Box display="flex"  flexDirection="column"  p={[0,0,5,5]} px={[4,10,5,5,20]} height={["100px","100px","100px","300px"]} alignItems={["","","center"]} justifyContent="center">
         <Text fontSize={["15px","15px","20px"]} fontWeight="bold">Woohoo! All steps completed!</Text>
         <NextLink href={`/products/info/${product.id}`} passHref><Link color="blue.400" textDecoration="underline" fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Click here to visit your updated product!!!</Link></NextLink>
      </Box>
      }
      </Box>
    )
}

export default UpdateProduct
