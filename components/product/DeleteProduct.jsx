import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
import { useRouter } from "next/router"
const DELETEPRODUCT=gql`
mutation ($id:ID!){
    deleteProduct(id:$id){
      message
    }
  }
`
const DeleteProduct = ({productId,storeId}) => {
    console.log(productId)
    const {authToken}=useAuth()
    const router = useRouter()
    const [deleteproduct,{data, loading,error }] = useMutation(DELETEPRODUCT,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
      const {data}= await deleteproduct({variables:{id:productId},context:{headers:{token:authToken || ""}}})
      if(data) router.push(`/stores/dashboard/mystore/${storeId}`) 
        
    }
    
    return (
        <>
        <button onClick={onSubmit} disabled={loading || data}>Remove </button>
        {loading && <p>Delete Product</p>}
        {error && <p>{error?.message}</p>}
</>
    )
}

export default DeleteProduct
