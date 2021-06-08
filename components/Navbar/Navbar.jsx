import React from 'react'
import {useAuth} from '../../lib/auth'
import NavbarNoUser from './NavbarNoUser'
import NavbarWithUser from './NavbarWithUser';


const Navbar = () => {
    const {signOut,decoded}=useAuth()
    return (
      <>
      {decoded ?  <NavbarWithUser signOut={signOut} user={decoded} /> :<NavbarNoUser />}
      </>
    )
}

export default Navbar
