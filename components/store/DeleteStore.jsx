import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
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
      if(data) router.push('/stores/dashboard/1') 
        
    }
    return (
        <>
        <button onClick={onSubmit} disabled={loading || data}>Remove from cart</button>
        {loading && <p>Delete Store</p>}
        {error && <p>{error?.message}</p>}
</>
    )
}

export default DeleteStore
