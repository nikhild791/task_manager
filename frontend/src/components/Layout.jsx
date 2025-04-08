import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import PageTransition from './PageTransition'

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-blue-50 dark:bg-gray-800 dark:text-white w-full flex flex-col'>
      <Navbar/>
      <PageTransition>
        <Outlet/>
      </PageTransition>
      <Footer/>
    </div>
  )
}

export default Layout