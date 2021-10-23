import React, { useEffect, useState } from 'react'
import { useMutation, gql } from "@apollo/client"
import { useForm } from 'react-hook-form';
import StoreForm from '../ReusableStoreComponets/Storeform/StoreForm';
import StoreImage from '../ReusableStoreComponets/Storeform/StoreImage';
import { Box,Text,Image,useToast  } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { useAuth } from '../../../lib/auth';
import { STORESINFO } from '../../../pages/stores/info/[id]';

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
    // const [ready,setReady]=useState(false)  
    const {authToken}=useAuth()
    const toast = useToast()
    const { nextStep, prevStep, activeStep } = useSteps({
      initialStep: 0,
    })
    const [updateStore,{ loading,error }] = useMutation(UPDATESTORE,{ errorPolicy: 'all',
    onCompleted:data => {
      if(data){
        toast({
          title: `Update successful.`,
          description: 'Click "Next" to update the image of your store.',
          status:"success",
          position:"top-right",
          isClosable: true,
        })
      }
    }
  });
    
    
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

    // useEffect(() => {
    //   setReady(true)
    // }, [])

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
 
    
    };
    return (
        <Box >
          {store && 
          <Steps colorScheme="teal" activeStep={activeStep} p={[1,1,6,6,8]}  fontFamily="body" textAlign={"left"}> 
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
                  <Image src={store?.storeBackgroundImage} alt={store?.storeName} width={200} height={200} fallbackSrc="https://images.pexels.com/photos/1526/dark-blur-blurred-gradient.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                  </Box>
                 <StoreImage storeId={store.id} store={store} prevStep={prevStep} nextStep={nextStep}/>
              </Step>
          </Steps>
          }

      </Box>
    )
}

export default UpdateStore
