import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
const DELETECART=gql`
mutation ($id:ID!){
    removeItem(id:$id){
      token
    }
  }
`
const DeleteItemInCart = ({productId,setCarts,carts}) => {
    const {authToken}=useAuth()
    const [deleteCart,{data, loading,error }] = useMutation(DELETECART,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
        await deleteCart({
            variables:{id:productId},
            context:{headers:{token:authToken || ""}}
        })
        const newCart=carts.filter((i)=>i.id !== productId)
        setCarts(newCart)
    }
    return (
        <>
            <button onClick={onSubmit} disabled={loading || data}>Remove from cart</button>
            {loading && <p>loading..</p>}
    </>
    )
}

export default DeleteItemInCart
