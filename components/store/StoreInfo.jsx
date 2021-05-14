import React from 'react'
import Image from 'next/image'
const StoreInfo = ({store}) => {
    return (
        <div>
            <Image src={store?.storeBackgroundImage} alt={store?.storeName} width={200} height={200}/>
            <p>{store?.storeName}</p>
            <p>{store?.storeType}</p>
            <p>{store?.storeDescription}</p>
            <p>{store?.storeAddress}</p>
            <p>{store?.socialMediaAcc}</p>
            <p>{store?.contactNumber}</p>
        </div>
    )
}

export default StoreInfo
