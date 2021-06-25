import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const StoreProduct = ({product}) => {
    console.log(product)
    return (
        <div>
            {
                product?.map(i=>(
                    <div key={i.id}>
                        <Image src={i.image} alt={i.productName} width={150} height={150}/>
                        <p>{i.productName}</p>
                        <p>$ {i.price}</p>
                        <Link href={`/products/info/${i.id}`}><a>Visit</a></Link>
                    </div>
                    
                ))
            }
        </div>
    )
}

export default StoreProduct
