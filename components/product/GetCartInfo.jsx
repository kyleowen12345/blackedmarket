import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Image from 'next/image'
import Link from 'next/link'
import Moment from 'react-moment';
import DeleteItemInCart from './DeleteItemInCart'
import Pagination from '../helpers/Pagination'
import Paypal from './Paypal';
const GetCartInfo = ({cart}) => {
  const [carts,setCarts]=useState(cart?.cart)
  const [total,setTotal]=useState()
  const [ready,setReady]=useState(false)
  const router = useRouter()
  const calculateTotal=()=>{
    let total=0
    carts.map(item=>{
      return total += parseInt(item.price,10) * item.quantity
    })
    setTotal(total)
  }
  useEffect(() => {
    setReady(true)
  }, [])
  useEffect(() => {
   if(carts){
     calculateTotal()
   }
  }, [carts])
  const transactionSuccess=(pay)=>{
    let variables={
        cartDetail:carts,paymentData:pay
    }
    console.log(variables)
}
  const transactionError=()=>{
    console.log('Paypal Error')
 }
 const transactionCancel=()=>{
  console.log('Transaction has been canceled')
}
  const handlePagination = id => {
      const path = router.pathname
      const query = router.query
      query.id = id.selected + 1
      router.push({
        pathname: path,
        query: query,
      })
      }
    return (
        <div>
            {
              carts?.map(i=>(
              <div key={i.id}>
           <Image src={i.image} alt={i.productName} width={300} height={300}/>
             <p>name {i.productName}</p>
             <p>price {i.price}</p>
             <p>qunatity {i.quantity}</p>
             <p><Moment format="LLLL">{Date.parse(i.date) || i.date}</Moment></p>
             <Link href={`/products/info/${i.id}`}><a>Visit</a></Link>
             <DeleteItemInCart productId={i.id} setCarts={setCarts} carts={carts}/>
           </div> 
                 ))
              }
            {carts.length >5 && <Pagination marginPages={3} pageRange={3} initialPage={cart?.curPage - 1} pageCount={cart?.maxPage} onPageChange={handlePagination}/> }
             {carts && <p>Total $ {total}</p>}
             
            {ready && carts && <Paypal toPay={total} ontracSuccess={transactionSuccess} ontracError={transactionError} ontracCancel={transactionCancel}/> }
        </div>
    )
}

export default GetCartInfo
