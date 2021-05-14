import React from 'react'
import Image from 'next/image'

const ProductLandingPage = ({products}) => {
    return (
        <div>
            {products?.map(i=>(
                <div key={i.id}>
                <Image src={i.image} alt={i.storeName} width={300} height={300}/>
                <p>{i.productName}</p>
                <p>$ {i.price}</p>
                <p>{i.description}</p>
                <p>{i.storeName.storeName}</p>
                </div>
            ))}
        </div>
    )
}

export default ProductLandingPage
