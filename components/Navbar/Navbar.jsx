import React,{ useRef,useEffect } from 'react'
import {useAuth} from '../../lib/auth'
import NavbarNoUser from './NavbarNoUser'
import NavbarWithUser from './NavbarWithUser';
import LoadingBar from 'react-top-loading-bar'
import { useLoad } from '../../lib/loader';

const Navbar = () => {
    const ref = useRef(null)
    const {userData,signOut}=useAuth()
    const {samePathName,latestPathName,currentPage}=useLoad()
    useEffect(() => {
      if(samePathName === true){
         return ref.current?.complete()
      }
     
  }, [samePathName])
     console.log(samePathName === true)
     console.log(latestPathName )
     console.log(currentPage)
    return (
      <>
       <LoadingBar color='#ffffff' height={4} ref={ref} transitionTime={500} />
      {userData ?  <NavbarWithUser signOut={signOut} user={userData.user} /> :<NavbarNoUser  refs={ref} latestPathName={latestPathName} currentPage={currentPage}/>}
      </>
    )
}

export default Navbar
