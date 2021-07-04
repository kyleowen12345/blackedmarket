import React from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from './StoreForm';
import Cookies from 'js-cookie';
import StoreImage from './StoreImage';
import { Box,Text,Link,Button } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import CreateStoreInstruct from './CreateStoreInstruct'
import NextLink from 'next/link'
const CREATESTORE = gql`
mutation ($storeName:String!,$storeAddress:String!,$storeDescription:String!,$storeType:String!,$socialMediaAcc:String!,$contactNumber:String!){
    createStore(storeName:$storeName,storeAddress:$storeAddress,storeDescription:$storeDescription,storeType:$storeType,socialMediaAcc:$socialMediaAcc,contactNumber:$contactNumber){
      id
    storeName
    storeBackgroundImage
    }
  }
`;
const CreateStore = () => {
    const [createstore,{data, loading,error }] = useMutation(CREATESTORE,{ errorPolicy: 'all' });
    const { nextStep, prevStep,reset, activeStep } = useSteps({
      initialStep: 0,
    })
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber}) => {
    await createstore({variables:{storeName:storeName,storeAddress:storeAddress,storeDescription:storeDescription,storeType:storeType,socialMediaAcc:socialMediaAcc,contactNumber:contactNumber},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
  
    };
    console.log(activeStep)
    return (
        <Box>
           <Steps colorScheme="teal" activeStep={activeStep} p={8}>
           <Step label={"Step 1"} key={1} description={"Instructions"} >
                  <Text pl={20} fontSize="20px" fontWeight="bold">Instructions</Text>
                  <Text pl={20} fontSize="12px" >This step is to give guidance for the user on how to finish all the steps and to verify if you are a seller.</Text>
                 <CreateStoreInstruct nextStep={nextStep}/>
              </Step>
              <Step label={"Step 2"} key={2} description={"Store details"}>
                  <Text pl={20} fontSize="20px" fontWeight="bold">Add details</Text>
                  <Text pl={20} fontSize="12px" >This step is for your store to have the neccesary details needed to be published.</Text>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <StoreForm register={register} loading={loading} error={error} errors={errors} prevStep={prevStep} nextStep={nextStep} data={data}/>
                  </form>
              </Step>
              <Step label={"Step 3"} key={3} description={"Store image"}>
                  <Text pl={20} fontSize="20px" fontWeight="bold">Upload Image</Text>
                  <Text pl={20} fontSize="12px" >This step is for your store to have a background image.</Text>
                  <StoreImage storeId={data?.createStore.id} nextStep={nextStep}/>
              </Step>
      </Steps>
      {activeStep === 3 && 
       <Box display="flex"  flexDirection="column" ml="auto" mr="auto" p={5} px={20}>
         <Text fontSize="20px" fontWeight="bold">Woohoo! All steps completed!</Text>
         <NextLink href={`/stores/info/${data?.createStore.id}`} passHref><Link color="blue.400" fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Click here to visit your new store!!!</Link></NextLink>
      </Box>
      }
      <Button onClick={prevStep}>prev</Button>
      <Button onClick={nextStep}>next</Button>
       </Box>
    )
}
export default CreateStore
