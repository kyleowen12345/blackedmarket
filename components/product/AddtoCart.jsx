import React, { useState } from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';

const ADDTOCART = gql`
mutation ($id:ID!,$quantity:Int,$productName:String!,$image:String!) {
    addToCart(id:$id,quantity:$quantity,productName:$productName,image:$image){
    token
    }
  }
`
const AddtoCart = ({product}) => {
    const {authToken}=useAuth()
    const [quantity,setQuantity]=useState(1)
    const [addToCart,{data, loading,error }] = useMutation(ADDTOCART,{ errorPolicy: 'all' });
    const onSubmit=async()=>{
       await addToCart({variables:{id:product.id,quantity:quantity,productName:product.productName,image:product.image},context:{headers:{token:authToken || ""}}})
    }
    console.log(error?.message)
    console.log(typeof quantity)
    return (
        <div>
            <input type="number" onChange={(e)=>setQuantity(parseInt(e.target.value))}  placeholder={"quantity"}/>
<button onClick={onSubmit} disabled={loading||data}>Add to Cart</button>
        </div>
        
    )
}

export default AddtoCart
