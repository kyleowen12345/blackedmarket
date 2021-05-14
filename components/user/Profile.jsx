import React from 'react'
import Image from 'next/image'
const Profile = ({user}) => {
    return (
        <div>
            <Image src={user?.profilePic} alt={user?.name} width={200} height={200}/>
            <p>{user?.email}</p>
            <p>{user?.name}</p>
        </div>
    )
}

export default Profile
