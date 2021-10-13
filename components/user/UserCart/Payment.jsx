import React, { useEffect, useState } from 'react'
import {Box,Text,useToast} from "@chakra-ui/react"
import { useCart } from '../../../lib/cart'
import { useAuth } from '../../../lib/auth'
import Paypal from '../../helpers/Paypal'

import axios from 'axios'

const Payment = () => {
    const {data,cartRefetch}=useCart()
    const {authToken}=useAuth()
    const [total,setTotal]=useState()
    const [ready,setReady]=useState(false)
    const toast = useToast()
    const calculateTotal=()=>{
        let total=0
        data?.getCartInfo.cart.map(item=>{
          return total += parseInt(item.price,10) * 0.25 +  parseInt(item.price,10) * item.quantity
        })
        setTotal(total)
      }
      useEffect(() => {
    if(data){
        calculateTotal()
        setReady(true)
    }
     
      }, [data])
      const transactionError=()=>{
       console.log('Paypal Error')
      }
      const transactionCancel=()=>{
       console.log('Transaction has been canceled')
      }
      const transactionSuccess=async(pay)=>{
        let variables={
          cartDetail:data.getCartInfo.cart,paymentData:pay
       }
        try {
         await axios.post(`${process.env.NEXT_PUBLIC_PURCHASE_KEY}`,variables,{headers:{
            token:authToken || ""
          }})
          cartRefetch()
          toast({
            title: `You successfully just purchase those items`,
            status:"success",
            isClosable: true,
          })
        } catch (error) {
          toast({
            title: `Something went wrong`,
            status:"error",
            isClosable: true,
          })
          console.log(error)
         }
       }
    return (
      <>
       {data?.getCartInfo.cart.length >= 1 && <Box p={[2,2,5]} bg="white" width="100%" display="flex" justifyContent="space-between" alignItems="center" flexDirection={["column","column","column","row"]} boxShadow="md" borderTop="2px solid black" position="sticky" bottom={0}>
             <Text fontWeight="bold" fontSize="13px">Pay with Paypal</Text>
             <Box display="flex" alignItems="center"  isTruncated>
                  <Text mr={3} fontWeight="bold" >Total ({data?.getCartInfo.productCount} item) : </Text> 
                  <Text fontWeight="bold" color="#FC8E00" isTruncated>$ {total}</Text> 
             </Box>
             {ready  && <Paypal toPay={total} ontracSuccess={transactionSuccess} ontracError={transactionError} ontracCancel={transactionCancel}/>} 
        </Box>}
        </>
    )
}

export default Payment
