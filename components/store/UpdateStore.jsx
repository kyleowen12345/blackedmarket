import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from './Storeform/StoreForm';
import StoreImage from './StoreImage';
import { Box,Text,Link,Button  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import Image from 'next/image'
import { useAuth } from '../../lib/auth';
import NextLink from 'next/link'
import { UPDATESTOREINFO } from '../../pages/stores/updatestore/[id]';
import { STORESINFO } from '../../pages/stores/info/[id]';
const UPDATESTORE = gql`
mutation ($id:ID!,$storeName:String!,$storeAddress:String!,$storeDescription:String!,$storeType:String!,$socialMediaAcc:String!,$contactNumber:String!){
  updateStore(id:$id,storeName:$storeName,storeAddress:$storeAddress,storeDescription:$storeDescription,storeType:$storeType,socialMediaAcc:$socialMediaAcc,contactNumber:$contactNumber){
        id
        storeName
        storeAddress
        storeDescription
        storeType
        sellerName{
          id
          email
          name
        }
        socialMediaAcc
        contactNumber
        createdAt
        storeBackgroundImage
      
    }
  }
`;

const UpdateStore = ({store,id}) => {
    const [ready,setReady]=useState(false)  
    const {authToken}=useAuth()
    const [updateStore,{data, loading,error }] = useMutation(UPDATESTORE,{ errorPolicy: 'all' });
    const { nextStep, prevStep, activeStep } = useSteps({
      initialStep: 0,
    })
    const { register, formState: { errors } , handleSubmit } = useForm({
      defaultValues:{
        storeName:store.storeName,
        storeAddress:store.storeAddress,
        storeDescription:store.storeDescription,
        storeType:store.storeType,
        socialMediaAcc:store.socialMediaAcc,
        contactNumber:store.contactNumber
      }
    });
    useEffect(() => {
      setReady(true)
    }, [])
    const onSubmit = async({storeName,storeAddress,storeDescription,storeType,socialMediaAcc,contactNumber}) => {
  await updateStore({variables:{id:store.id,storeName:storeName,storeAddress:storeAddress,storeDescription:storeDescription,storeType:storeType,socialMediaAcc:socialMediaAcc,contactNumber:contactNumber},context:{headers:{token:authToken || ""}},
  update(cache,{data}){
    const oldStoreDetail=cache.readQuery({query:STORESINFO,variables:{id:id}})

    if(data){
      cache.writeQuery({
        query:STORESINFO,
        variables:{id:id},
        data:{
          storeInfo:{
            __typename:"StoreswithProduct",
            isUserAFollower:false,
            products:oldStoreDetail.storeInfo.products,
            store:data.updateStore
          }
        }
      })
    }
   
  }})
    // if(data){
    //   return nextStep()
    // }
    };
    return (
        <Box >
          {ready && 
          <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,1,1,8]}  fontFamily="body" textAlign={"left"}> 
             <Step label={"Step 1"} key={1} description={"Edit details"} >
                  <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold">Edit details</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" >Please make sure to submit if you make changes.</Text>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <StoreForm register={register} loading={loading} error={error} errors={errors} prevStep={prevStep} nextStep={nextStep} store={store}/>
               </form>
                
              </Step>
              <Step label={"Step 2"} key={2} description={"Edit image"}>
              <Text pl={[1,1,5,5,20]} fontSize="24px" fontWeight="bold" w={["200px","200px","500px"]}>Edit image</Text>
                  <Text pl={[1,1,5,5,20]} fontSize="12px" w={["200px","200px","100%"]}>The image below is the current image of your store, select an image of your choice to change it and click finish.</Text>
                  <Box pl={[1,1,5,5,20]} mt={3}>
                  <Image src={store?.storeBackgroundImage} alt={store?.storeName} width={200} height={200}/>
                  </Box>
                 <StoreImage storeId={store.id} store={store} prevStep={prevStep} nextStep={nextStep}/>
              </Step>
          </Steps>
          }
          {activeStep === 2 && 
       <Box display="flex"  flexDirection="column" ml="auto" mr="auto" p={[0,0,5,5]} px={[4,10,5,5,20]}>
         <Text fontSize="20px" fontWeight="bold">Woohoo! All steps completed!</Text>
         <NextLink href={`/stores/info/${store.id}`} passHref><Link color="blue.400" textDecoration="underline" fontWeight="bold" fontSize={["12px","13px","14px","16px"]} >Click here to go to your store!!!</Link></NextLink>
      </Box>
      }
      </Box>
    )
}

export default UpdateStore
