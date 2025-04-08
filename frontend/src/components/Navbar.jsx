import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const useThemeRef = useRef(null)

  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

const toggleTheme=() =>{
  if(useThemeRef.current ?? useThemeRef.current.value){
    switch(useThemeRef.current.value){
      case "light":
        document.documentElement.classList.remove('dark')
        localStorage.theme = "light";
        break;
        case "dark":
        document.documentElement.classList.add('dark')
        localStorage.theme = "dark";
        break;
      case "os":
        if(window.matchMedia("(prefers-color-scheme: dark)").matches){
          document.documentElement.classList.add('dark')
        }else{
          document.documentElement.classList.remove('dark')
        }
        localStorage.removeItem("theme");
        
    }

  }  
}

  return (
    <nav className='min-w-screen h-20 bg-white dark:bg-gray-900  flex items-center flex-row shadow-md'>
       <div className='w-11/12  mx-auto'>
      <div className='flex flex-row justify-between items-center mx-2 '>
        <div className='text-4xl font-bold dark:text-white text-blue-600'>
          <Link to='/'>
      Prabandhan
          </Link>
        </div>
        <div>
          <ul className='flex flex-row gap-2'>
            <li className='dark:text-white'><Link to="/features">features</Link></li>
            <li className='dark:text-white'><Link to="/pricing">Pricing</Link></li>
            <li className='dark:text-white'><Link to="/about">about</Link></li>
            <li className='dark:text-white'><Link to="/contact">contact</Link></li>
          </ul>
        </div>
        <div>
         
          <select className='dark:text-white' defaultValue={'os'} ref={useThemeRef}  onChange={toggleTheme}>Theme
          <option value="light"  className='dark:bg-gray-800 dark:text-white'>light</option>
            <option value="dark" className='dark:bg-gray-800 dark:text-white'>dark</option>
            <option value="os"  className='dark:bg-gray-800 dark:text-white'>os</option>
          </select>
        <Link className='dark:text-white' to="/signin">signin</Link>
        </div>
      </div>
       </div>
    </nav>
  )
}

export default Navbar