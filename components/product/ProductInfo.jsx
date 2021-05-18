import React from 'react'
import Image from 'next/image'
import AddtoCart from './AddtoCart'
import jwt_decode from "jwt-decode";
import { useAuth } from '../../lib/auth';
const ProductInfo = ({product}) => {
    const {authToken}=useAuth()
    let decoded=null
    if(authToken){
        decoded=jwt_decode(authToken)
    }
    return (
        <div> 
            <Image src={product?.image} alt={product?.productName} width={200} height={200}/>
            <p>{product?.productName}</p>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            <p>{product?.productStocks}</p>
            <p>{product?.sold}</p>
            <p>{product?.storeName.storeName}</p>
            <p>{product?.storeOwner.email}</p>
           {product?.storeOwner.id !== decoded?.id && <AddtoCart product={product}/>} 
        </div>
    )
}

export default ProductInfo
