import React, { useEffect, useState } from 'react'
import {Box,Text} from "@chakra-ui/react"
import axios from 'axios'
import { useCart } from '../../../lib/cart'
import { useAuth } from '../../../lib/auth'
import Paypal from '../../product/Paypal'

const Payment = () => {
    const {data,cartRefetch}=useCart()
    const {authToken}=useAuth()
    const [total,setTotal]=useState()
    const [ready,setReady]=useState(false)
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
        } catch (error) {
          console.log(error)
         }
       }
    return (
        <Box p={5} bg="white" width="100%" display="flex" justifyContent="space-between" alignItems="center" flexDirection={["column","column","column","column","row"]} boxShadow="md" border="2px solid black" borderRadius={5} position="sticky" bottom={0}>
            <Box >
               <Text fontWeight="bold" fontSize="13px">Pay with Paypal</Text> 
            </Box>
            <Box display="flex" alignItems="center"  justifyContent="space-between" flexDirection={["column","column","column","column","row"]} width="40%" mt={[2,2,0]}>
               <Box display="flex" alignItems="center" width="200px">
               <Text mr={3} fontWeight="bold">Total ({data?.getCartInfo.productCount} item) : </Text> 
               <Text fontWeight="bold" color="#FC8E00">$ {total}</Text> 
               </Box>
               {ready  && <Paypal toPay={total} ontracSuccess={transactionSuccess} ontracError={transactionError} ontracCancel={transactionCancel}/>}
            </Box>
        </Box>
    )
}

export default Payment
