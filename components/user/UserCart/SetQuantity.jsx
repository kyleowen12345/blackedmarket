import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { Box,Text,Image,Button,Link,Input} from "@chakra-ui/react"
import { useAuth } from '../../../lib/auth';
import { CARTINFO,useCart } from '../../../lib/cart';
import { useRouter } from 'next/router'
const SETQUANTITY=gql`
mutation ($id:ID!,$value:Int!){
    setQuantity(id:$id,value:$value){
    token
  }
}
`
const SetQuantity = ({details}) => {
    const router = useRouter()
    const {id}= router.query
    const {authToken}=useAuth()
    const {cartRefetch}=useCart()
    const [setQuantity,{data, loading }] = useMutation(SETQUANTITY,{ errorPolicy: 'all' },);
    const onSetQuantity=async(product,value)=>{
       await setQuantity({variables:{id:product,value:value},context:{headers:{token:authToken||""}}})
       cartRefetch()
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
