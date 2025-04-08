import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-blue-50 dark:bg-gray-800 dark:text-white w-full flex flex-col'>
    <Navbar/>
    <div className=''>
    <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Layout