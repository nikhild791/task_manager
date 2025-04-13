import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { authService, userService } from '../api/admin';
import { useAuth } from '../contexts/AuthContext';

const Signin = () => {
  const {currentUser,login,userLogin} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(currentUser){
      navigate('/main')
    }
  },[navigate,currentUser])
  const [tab, setTab] = useState(1)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    adminname: '',
    username: ''
  })
  
  const handleClick = async(e) => {
    e.preventDefault()
    const res = await authService.adminSignin(credentials)
    if(res.success){
      login(res.token)
    }
  }
  
  const handleAdminClick = async(e) => {
    e.preventDefault()
    const res = await userService.userSignin(credentials)
    if(res.success){
      userLogin(res.token)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className="min-h-screen mt-8 bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AnimatedSection delay={0.1}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account ad admin or as user
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className='flex justify-around pb-4'>
            <span className={`shadow dark:border-[1px] cursor-pointer border-gray-200 px-12 ${tab==1?'text-blue-600':''} `} onClick={()=>{setTab(1)}} >User</span>
            <span className={`shadow dark:border-[1px] cursor-pointer border-gray-200 px-12 ${tab==2?'text-blue-600':''} `} onClick={()=>{setTab(2)}}>Admin</span>
          </div>
           {tab==1 && <form className="space-y-6" onSubmit={handleAdminClick}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  admin name
                </label>
                <div className="mt-1">
                  <input
                  value={credentials.adminname}
                  onChange={handleChange}
                    id="adminname"
                    name="adminname"
                    type="adminname"
                    autoComplete="adminname"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1">
                  <input
                  value={credentials.username}
                  onChange={handleChange}
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={credentials.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Sign in
                </button>
              </div>
            </form>}
           {tab==2 && <form className="space-y-6" onSubmit={handleClick}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                  value={credentials.email}
                  onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={credentials.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Sign in
                </button>
              </div>
            </form>}

           
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Signin;