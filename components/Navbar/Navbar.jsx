import React,{useState,useEffect} from 'react'
import {useAuth} from '../../lib/auth'
import NavbarNoUser from './NavbarNoUser'
import NavbarWithUser from './NavbarWithUser';


const Navbar = () => {
    const {signOut,userCookie,userData,loading}=useAuth()
     const [ready,setReady]=useState(false)
    useEffect(() => {
      setReady(true)
  }, [])
    return (
      <>
      {ready && userCookie ?  <NavbarWithUser signOut={signOut} user={userData} loading={loading}/> :<NavbarNoUser />}
      </>
    )
}

export default Navbar
