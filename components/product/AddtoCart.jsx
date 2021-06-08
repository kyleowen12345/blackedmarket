import React, { useState } from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useAuth } from '../../lib/auth';

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
        <div>
            <input type="number" onChange={(e)=>setQuantity(parseInt(e.target.value))}  placeholder={"quantity"}/>
<button onClick={onSubmit} disabled={loading||data}>Add to Cart</button>
        </div>
        
    )
}

export default AddtoCart
