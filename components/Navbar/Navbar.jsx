import React from 'react'
import {useAuth} from '../../lib/auth'
import NavbarNoUser from './NavbarNoUser'
import NavbarWithUser from './NavbarWithUser';


const Navbar = () => {
    const {userData,signOut,loading}=useAuth()
    return (
      <>
      {loading === false &&<div>
      {userData ?  <NavbarWithUser signOut={signOut} user={userData.user} /> :<NavbarNoUser />}
      </div>}
      </>
    )
}

export default Navbar
