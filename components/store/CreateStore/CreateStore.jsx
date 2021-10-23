import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from '../ReusableStoreComponets/Storeform/StoreForm';
import StoreImage from '../ReusableStoreComponets/Storeform/StoreImage';
import { Box,Text,Link,useToast  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import CreateStoreInstruct from './CreateStoreInstruct'
import NextLink from 'next/link'
import { useAuth } from '../../../lib/auth';

const CREATESTORE = gql`
mutation ($storeName:String!,$storeAddress:String!,$storeDescription:String!,$storeType:String!,$socialMediaAcc:String!,$contactNumber:String!){
    createStore(storeName:$storeName,storeAddress:$storeAddress,storeDescription:$storeDescription,storeType:$storeType,socialMediaAcc:$socialMediaAcc,contactNumber:$contactNumber){
      id
    storeName
    storeBackgroundImage
    }
  }
`;
const CreateStore = ({seller}) => {
    // const [ready,setReady]=useState(false)
    const {authToken}=useAuth()
    const toast = useToast()
    const [createstore,{data,loading,error }] = useMutation(CREATESTORE,{ errorPolicy: 'all',
      onCompleted:data => {
        if(data){
          nextStep()
          toast({
            title: "Successfully created a store",
            description: 'Now you can add an image for your store.',
            status:"success",
            position:"top-right",
            isClosable: true,
          })
        }
      }  
  });
    const { nextStep, prevStep, activeStep } = useSteps({
      initialStep: seller?.user.Seller ? 1 : 0,
    })
    const { register, formState: { errors } , handleSubmit } = useForm();
    
    const onSubmit = async({storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber}) => {
    await createstore({variables:{storeName:storeName,storeAddress:storeAddress,storeDescription:storeDescription,storeType:storeType,socialMediaAcc:socialMediaAcc,contactNumber:contactNumber},context:{headers:{token:authToken || ""}}})
  };

    // useEffect(() => {
    //   setReady(true)
    // }, [])
    return (
        <Box >
           {seller && <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,6,6,8]}  fontFamily="body" textAlign={"left"}>
           <Step label={"Step 1"} key={1} description={"Instructions"} >
                  <Text pl={[1,1,5,5,20]}fontSize="24px" fontWeight="bold">Instructions</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >This step is to give guidance for the user on how to finish all the steps and to verify if you are a seller.</Text>
                 <CreateStoreInstruct nextStep={nextStep} isSeller={seller?.user.Seller}/>
              </Step>
              <Step label={"Step 2"} key={2} description={"Store details"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold">Add details</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >Complete all the details and submit to continue.</Text>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <StoreForm register={register} loading={loading} error={error} errors={errors} data={data}/>
                  </form>
              </Step>
              <Step label={"Step 3"} key={3} description={"Store image"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Upload Image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","500px"]}>Select an image and click finish.</Text>
                  <StoreImage storeId={data?.createStore.id} nextStep={nextStep}/>
              </Step>
      </Steps>
      }
       </Box>
    )
}
export default CreateStore
