import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Profile = ({user}) => {
    return (
        <div>
            
            <Image src={user?.profilePic} alt={user?.name} width={200} height={200}/>
            <p>{user?.email}</p>
            <p>{user?.name}</p>
            <Link href="/user/updateprofile"><a>Update Profile</a></Link>

        </div>
    )
}

export default Profile
