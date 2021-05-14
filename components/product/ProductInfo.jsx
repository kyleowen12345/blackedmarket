import React from 'react'
import Image from 'next/image'

const ProductInfo = ({product}) => {
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
        </div>
    )
}

export default ProductInfo
