import React, { useEffect } from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../../../../lib/auth';
import { useRouter } from "next/router"
import { Button,useToast  } from "@chakra-ui/react"

const DELETESTORE=gql`
mutation ($id:ID!){
    deleteStore(id:$id){
      message
    }
  }
`

const DeleteStore = ({storeId}) => {
    const {authToken}=useAuth()
    const router = useRouter()
    const toast = useToast()
    const [deletestore,{data, loading,error }] = useMutation(DELETESTORE,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
      const {data:storeData}= await deletestore({variables:{id:storeId},context:{headers:{token:authToken || ""}}})
      if(storeData){
        toast({
              title: `Delete successful`,
              description: "You deleted the store.",
              status:"success",
              position:"top-right",
              isClosable: true,
        })
        router.push('/user/mystores?id=1&sortOrder=storeName') 
      }
      
        
    }

    useEffect(async() => {
      if(error){
        toast({
          title: `Delete failed.`,
          description: `${error.message}`,
          status:"error",
          position:"top-right",
          isClosable: true,
        })
       }

      },[error]);
 
    return (
        <Button colorScheme="red" onClick={onSubmit} disabled={loading || data} isLoading={loading}>Delete</Button>
    )
}

export default DeleteStore
