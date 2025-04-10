import { Routes,Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import Dashboard from './components/Main/Dashboard'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './layouts/ProtectedRoute'
import { TaskProvider } from './contexts/TaskContext'

function App() {

  return (
    <AuthProvider>  
      <TaskProvider>
    <Routes>
    <Route path="/" element={<Layout/>} >
    <Route index element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/pricing' element={<Pricing/>} />
    <Route path='/features' element={<Features/>} />
    <Route path='/signin' element={<Signin/>} />
    <Route path='/signup' element={<Signup/>} />
    </Route>

    <Route path="/main" element={<ProtectedRoute/>} >
    <Route index element={<Home/>} />

    <Route path='/main/dashboard' element={<Dashboard/>} />
    {/* <Route path='/main/contact' element={<Contact/>} />
    <Route path='/main/pricing' element={<Pricing/>} />
    <Route path='/features' element={<Features/>} />
    <Route path='/signin' element={<Signin/>} />
    <Route path='/signup' element={<Signup/>} /> */}
    </Route>

    </Routes>
    </TaskProvider> 
    </AuthProvider>
  )
}

export default App
