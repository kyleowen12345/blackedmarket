import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../../lib/auth';
import { Button} from "@chakra-ui/react"
import { CARTINFO } from '../../../lib/cart';

const DELETECART=gql`
mutation ($id:ID!){
    removeCartItem(id:$id){
      token
    }
  }
`
const DeleteItemInCart = ({productId}) => {
    const {authToken}=useAuth()
    const [deleteCart,{data, loading }] = useMutation(DELETECART,{ errorPolicy: 'all' },);
    const onSubmit=async()=>{
        await deleteCart({
            variables:{id:productId},
            context:{headers:{token:authToken || ""}},
            update(cache,{data}){
              const oldCart=cache.readQuery({
                  query:CARTINFO,
                  context:{headers:{token:authToken||""}}
              })
              if(data){
                  cache.writeQuery({
                      query:CARTINFO,
                      context:{headers:{token:authToken||""}},
                      data:{
                        getCartInfo:{
                            __typename: "cartPaginate", 
                            productCount:oldCart.getCartInfo.productCount - 1,
                            cart:oldCart.getCartInfo.cart.filter(i=>i.id !== productId)
                        }
                      }
                  })
              }
            }
        })
    }
    return (
            <Button width={[" "," "," ","14%"]} p={0} bg="white" align="center" fontSize={["13px","13px","13px","14px"]} color="red" _hover={{bg:"white"}} _focus={{bg:"white"}} onClick={onSubmit} disabled={loading || data} isLoading={loading}>Remove </Button>
    )
}

export default DeleteItemInCart
