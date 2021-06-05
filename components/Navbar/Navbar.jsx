import React from 'react'
import {useAuth} from '../../lib/auth'
import NavbarNoUser from './NavbarNoUser'
import NavbarWithUser from './NavbarWithUser';


const Navbar = () => {
    const {userData,signOut}=useAuth()
    return (
      <>
      {userData ?  <NavbarWithUser signOut={signOut} user={userData.user} /> :<NavbarNoUser />}
      </>
    )
}

export default Navbar
