import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from './Storeform/StoreForm';
import Cookies from 'js-cookie';
import StoreImage from './StoreImage';
import { Box,Text,Link  } from "@chakra-ui/react"
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
const CreateStore = ({isSeller}) => {
    const [ready,setReady]=useState(false)
    const [createstore,{data, loading,error }] = useMutation(CREATESTORE,{ errorPolicy: 'all' });
    const { nextStep, prevStep, activeStep } = useSteps({
      initialStep: 0,
    })
    const { register, formState: { errors } , handleSubmit } = useForm();
    const onSubmit = async({storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber}) => {
    await createstore({variables:{storeName:storeName,storeAddress:storeAddress,storeDescription:storeDescription,storeType:storeType,socialMediaAcc:socialMediaAcc,contactNumber:contactNumber},context:{headers:{token:Cookies.get('blackedmarket') || ""}}})
    };
    useEffect(() => {
      setReady(true)
    }, [])
    return (
        <Box >
           {ready && <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,1,1,8]}  fontFamily="body" textAlign={"left"}>
           <Step label={"Step 1"} key={1} description={"Instructions"} >
                  <Text pl={[1,1,5,5,20]}fontSize="24px" fontWeight="bold">Instructions</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >This step is to give guidance for the user on how to finish all the steps and to verify if you are a seller.</Text>
                 <CreateStoreInstruct nextStep={nextStep} isSeller={isSeller}/>
              </Step>
              <Step label={"Step 2"} key={2} description={"Store details"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold">Add details</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >Complete all the details and submit to continue.</Text>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <StoreForm register={register} loading={loading} error={error} errors={errors} prevStep={prevStep} nextStep={nextStep} data={data}/>
                  </form>
              </Step>
              <Step label={"Step 3"} key={3} description={"Store image"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Upload Image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","500px"]}>Select an image and click finish.</Text>
                  <StoreImage storeId={data?.createStore.id} nextStep={nextStep}/>
              </Step>
      </Steps>
      }
      {activeStep === 3 && 
       <Box display="flex"  flexDirection="column" ml="auto" mr="auto" p={[0,0,5,5]} px={[4,10,5,5,20]}>
         <Text fontSize="20px" fontWeight="bold">Woohoo! All steps completed!</Text>
         <NextLink href={`/stores/info/${data?.createStore.id}`} passHref><Link color="blue.400" textDecoration="underline" fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Click here to visit your new store!!!</Link></NextLink>
      </Box>
      }
       </Box>
    )
}
export default CreateStore
