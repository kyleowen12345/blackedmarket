import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { Box,Text,Button} from "@chakra-ui/react"
import { useAuth } from '../../../lib/auth';
import { CARTINFO } from '../../../lib/cart';
const SETQUANTITY=gql`
mutation ($id:ID!,$value:Int!){
    setQuantity(id:$id,value:$value){
    token
  }
}
`
const SetQuantity = ({details}) => {
    const {authToken}=useAuth()
    const [setQuantity,{data, loading }] = useMutation(SETQUANTITY,{ errorPolicy: 'all' });
    const onSetQuantity=async(product,value)=>{
       await setQuantity({variables:{id:product,value:value},context:{headers:{token:authToken||""}},
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
                      cart:oldCart.getCartInfo.cart.map(i=>i.id === product && {...i,quantity:value})
                  }
                }
            })
        }
       }
    })
    }
    return (
        <Box display="flex" w="18%">
                <Button bg="white" disabled={details.quantity == 1} isLoading={loading} _hover={{bg:"white"}} borderRadius={0} border="1px solid #E2E8F0" height={["25px","25px","30px"]} onClick={()=>onSetQuantity(details.id,details.quantity - 1)}>-</Button>
                <Box display="flex" justifyContent="center" alignItems="center" width="50px" border="1px solid #E2E8F0">
                 <Text>{details.quantity}</Text>
                </Box>
                <Button  bg="white" isLoading={loading} _hover={{bg:"white"}}  borderRadius={0} border="1px solid #E2E8F0" height={["25px","25px","30px"]} onClick={()=>onSetQuantity(details.id,details.quantity + 1)}>+</Button>
        </Box>
    )
}

export default SetQuantity
