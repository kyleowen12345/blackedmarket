import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../../lib/auth';
import { Box,Text,Image,Button,Link,Input} from "@chakra-ui/react"
import { CARTINFO, useCart } from '../../../lib/cart';
import { useRouter } from 'next/router'
const DELETECART=gql`
mutation ($id:ID!){
    removeItem(id:$id){
      token
    }
  }
`
const DeleteItemInCart = ({productId}) => {
    const router = useRouter()
    const {id}= router.query
    const {authToken}=useAuth()
    const {cartRefetch}=useCart()
    const [deleteCart,{data, loading }] = useMutation(DELETECART,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
        await deleteCart({
            variables:{id:productId},
            context:{headers:{token:authToken || ""}},
            
        })
        cartRefetch()
    }
    return (
        <>
            <Button width="14%" bg="white" fontSize="14px" color="red" _hover={{bg:"white"}} _focus={{bg:"white"}} onClick={onSubmit} disabled={loading || data} isLoading={loading}>Remove </Button>
    </>
    )
}

export default DeleteItemInCart
