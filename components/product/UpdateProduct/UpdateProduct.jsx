import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import { Box,Text,Image  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import ProductImage from '../ReusableProductComponent/ProductImage';
import ProductForm from '../ReusableProductComponent/ProductForm/ProductForm';
import { useAuth } from '../../../lib/auth';
import { PRODUCTINFO } from '../../../pages/products/info/[id]';
import { STORESINFO } from '../../../pages/stores/info/[id]';


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
    const { nextStep, prevStep, activeStep } = useSteps({initialStep: 0})
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
     if(storeNamelist){
     const {data:ProductData}= await updateproduct({variables:{id:product.id,productName:productName,price:parseInt(price),productStocks:parseInt(productStocks),description:description,storeName:storeNamelist.id},context:{headers:{token:authToken || ""}},
      refetchQueries:[{query:PRODUCTINFO,variables:{id:product.id}},{query:STORESINFO,variables:{id:storeNamelist.id}}]})
      if(ProductData){
        toast({
          title: `Update successful.`,
          description: 'Click "Next" to update the image of your product.',
          status:"success",
          position:"top-right",
          isClosable: true,
        })
      }
     } 
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
                  <Image src={product?.image} alt={product?.productName} width={200} height={200} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                  </Box>
                  <ProductImage productId={product.id} storeId={product.storeName.id} nextStep={nextStep} product={product} prevStep={prevStep}/>
              </Step>  
             </Steps>
             }
      </Box>
    )
}

export default UpdateProduct
