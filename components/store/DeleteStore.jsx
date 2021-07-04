import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
import { Button  } from "@chakra-ui/react"
const DELETESTORE=gql`
mutation ($id:ID!){
    deleteStore(id:$id){
      message
    }
  }
`
const DeleteStore = ({storeId}) => {
    console.log(storeId)
    const {authToken}=useAuth()
    const router = useRouter()
    const [deletestore,{data, loading,error }] = useMutation(DELETESTORE,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
      const {data}= await deletestore({variables:{id:storeId},context:{headers:{token:authToken || ""}}})
      if(data) router.push('/') 
        
    }
    //  {error && <p>{error?.message}</p>} 
    return (
        <Button colorScheme="red" onClick={onSubmit} disabled={loading || data} isLoading={loading}>Delete</Button>
    )
}

export default DeleteStore
