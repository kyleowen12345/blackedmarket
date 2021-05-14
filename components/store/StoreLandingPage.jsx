import React from 'react'
import Image from 'next/image'
const StoreLandingPage = ({stores}) => {
    return (
        <div>
            {stores?.map(i=>(
                <div key={i.id}>
                <Image src={i.storeBackgroundImage} alt={i.storeName} width={300} height={300}/>
                <p>{i.storeName}</p>
                <p>{i.storeType}</p>
                </div>
            ))}
        </div>
    )
}

export default StoreLandingPage
