import React from 'react'
import Image from 'next/image'
import DeleteStore from './DeleteStore'
import { useAuth } from '../../lib/auth'
import jwt_decode from "jwt-decode";
import Link from 'next/link'
const StoreInfo = ({store}) => {
    const {authToken}=useAuth()
    let decoded=null
    if(authToken){
        decoded=jwt_decode(authToken)
    }
    return (
        <div>
            <Image src={store?.storeBackgroundImage} alt={store?.storeName} width={200} height={200}/>
            <p>{store?.storeName}</p>
            <p>{store?.storeType}</p>
            <p>{store?.storeDescription}</p>
            <p>{store?.storeAddress}</p>
            <p>{store?.socialMediaAcc}</p>
            <p>{store?.contactNumber}</p>
            {decoded?.id === store?.sellerName.id && <DeleteStore storeId={store?.id}/>}
            <br/>
            {decoded?.id === store?.sellerName.id && <Link href={`/stores/updatestore/${store.id}`}><a>Update</a></Link>}
        </div>
    )
}

export default StoreInfo
