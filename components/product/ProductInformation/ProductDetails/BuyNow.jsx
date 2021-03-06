import React, { useState,useEffect } from 'react'
import { Modal,ModalOverlay,Button,Input,ModalContent,ModalHeader,ModalBody,ModalCloseButton,Box,Text,ModalFooter,useToast   } from "@chakra-ui/react"
import Paypal from '../../../helpers/Paypal'
import Shipping from './Shipping'
import Cookies from 'js-cookie';
import axios from 'axios'



const BuyNow = ({isOpen,quantity,product,setQuantity,onClose,initialRef,finalRef,refetch}) => {
    const [ready,setReady]=useState(false)
    const total=product.price * quantity
    const shipping=product.price  * 0.25
    const toast = useToast()
    useEffect(() => {
        if(isOpen){
          setReady(true)
        }
       }, [isOpen])
    const transactionSuccess=async(pay)=>{
        let variables={
          cartDetail:[{price: product.price,
            id: product.id,
            image: product.image,
            productName: product.productName,
            quantity: quantity,
            storeName:product.storeName.id,
            storeOwner:product.storeOwner.id}],paymentData:pay
      }
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_PURCHASE_KEY}/singlePurchase`,variables,{headers:{
            token:Cookies.get('blackedmarket') || ""
          }})
          onClose()
          refetch()
          toast({
            title: `It's a celebration  b**ch , its a successful purchase`,
                status:"success",
                isClosable: true,
          })
        } catch (error) {
          console.log(error)
          toast({
            title: `Purchase Failed`,
            description: "Please log-in again",
                status:"error",
                isClosable: true,
          })
        }
    }  
    const transactionError=()=>{
        console.log('Paypal Error')
     }
     const transactionCancel=()=>{
      console.log('Transaction has been canceled')
    }
    return (
        <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product.productName}</ModalHeader>
          <ModalCloseButton boxShadow="none"/>
          <ModalBody pb={6} >
          <Box m={3} mt={5} display={"flex"} alignItems="center">
                <Box mr={[5,5,20]} width={"95px"}>
                <Text color="#888888" fontSize={["8px","13px","15px"]}>Price </Text>
                </Box>
                <Box maxW={["150px","150px","200px"]} isTruncated>
                <Text fontSize={["8px","13px","15px"]} fontWeight="bold" isTruncated>${product.price}</Text>
                </Box>
            </Box>
             <Box m={3} mt={5} display={"flex"}>
               <Box mr={[5,5,20]} width={"95px"} >
                <Text color="#888888" fontSize={["8px","13px","15px"]}>Quantity </Text>
                </Box>
                <Box display="flex" width={["100px","150px","186px"]}>
                <Button disabled={quantity == 1} bg="white" _hover={{bg:"white"}} borderRadius={0} border="1px solid #E2E8F0" height="30px" onClick={()=>setQuantity(quantity-1)}>-</Button>
                <Input  type="number" onChange={(e)=>setQuantity(parseInt(e.target.value))} value={quantity} width={"100px"} borderRadius={0}  focusBorderColor="none"  height="30px"/>
                <Button disabled={quantity == product.productStocks} bg="white" _hover={{bg:"white"}}  borderRadius={0} border="1px solid #E2E8F0" height="30px" onClick={()=>setQuantity(quantity+1)}>+</Button>
                </Box>
              </Box>
            <Shipping product={product}/>
           
            <Box m={3} mt={5} display={"flex"} alignItems="center">
                <Box mr={[5,5,20]} width={"95px"}>
                <Text color="#888888" fontSize={["8px","13px","15px"]}>Total </Text>
                </Box>
                <Box maxW={["150px","150px","200px"]} isTruncated>
                <Text fontSize={["8px","13px","15px"]} fontWeight="bold" isTruncated>${total + shipping}</Text>
                </Box>
                
            </Box>
          </ModalBody>

          <ModalFooter dis="flex" alignItems="center" ml="auto" mr="auto">
          {ready && <Paypal toPay={total + shipping} ontracSuccess={transactionSuccess} ontracError={transactionError} ontracCancel={transactionCancel}/> }
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}

export default BuyNow
