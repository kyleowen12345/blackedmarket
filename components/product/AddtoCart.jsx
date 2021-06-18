import React, { useState } from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';
import { Box,Text,Button,Input,Icon,useDisclosure  } from "@chakra-ui/react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import BuyNow from './BuyNow/BuyNow';

const ADDTOCART = gql`
mutation ($id:ID!,$quantity:Int,$productName:String!,$image:String!,$price:String!,$storeName:ID!,$storeOwner:ID!) {
    addToCart(id:$id,quantity:$quantity,productName:$productName,image:$image,price:$price,storeName:$storeName,storeOwner:$storeOwner){
    token
    }
  }
`
const AddtoCart = ({product}) => {
    const {authToken}=useAuth()
    const [quantity,setQuantity]=useState(1)
    const [addToCart,{data, loading,error }] = useMutation(ADDTOCART,{ errorPolicy: 'all' });
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
   
    const onSubmit=async()=>{
       await addToCart({variables:{
        id:product.id,
        quantity:quantity,
        productName:product.productName,
        image:product.image,
        price:product.price,
        storeName:product.storeName.id,
        storeOwner:product.storeOwner.id
    },context:{headers:{token:authToken || ""}}})
    }
    
    return (
        <Box>
            <Box m={3} mt={5} display={"flex"}>
               <Box mr={[5,5,20]} width={"95px"} >
                <Text color="#888888" fontSize={["8px","14px","15px"]}>Quantity :</Text>
                </Box>
                <Box display="flex" width={["100px","150px","186px"]}>
                <Button disabled={quantity == 1} bg="white" _hover={{bg:"white"}} borderRadius={0} border="1px solid #E2E8F0" height="30px" onClick={()=>setQuantity(quantity-1)}>-</Button>
                <Input  type="number" onChange={(e)=>setQuantity(parseInt(e.target.value))} value={quantity} width={"100px"} borderRadius={0}  focusBorderColor="none"  height="30px"/>
                <Button disabled={quantity == product.productStocks} bg="white" _hover={{bg:"white"}}  borderRadius={0} border="1px solid #E2E8F0" height="30px" onClick={()=>setQuantity(quantity+1)}>+</Button>
                </Box>
            </Box>
            <Box display={"flex"} width={["300px","300px","400px"]} justifyContent="space-between" m={3} mt={5}>
            <Button fontSize={["13px","13px","18px"]} onClick={onSubmit} disabled={loading||data || quantity > product.productStocks} width={["120px","120px","180px"]} bg="#FFF0DD" color="#FC8E00" border="1px solid #FC8E00" _hover={{bg:"#FFF0DD"}}><Icon as={AiOutlineShoppingCart} color="#FC8E00" mr={2}/>Add to Cart</Button>
            <Button fontSize={["13px","13px","18px"]}  width={["120px","120px","180px"]}  bg="#FC8E00" color="white" _hover={{bg:"#FC8E00"}} mr={[5,5,0]} onClick={onOpen}>Buy Now</Button>
            </Box>
            <BuyNow isOpen={isOpen} quantity={quantity} product={product} setQuantity={setQuantity} onClose={onClose}  initialRef={initialRef} finalRef={finalRef} />
        </Box>
        
    )
}

export default AddtoCart
