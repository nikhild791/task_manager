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
import Profile from './components/Main/Profile'
import { ChatProvider } from './contexts/ChatContext'
import AdminRoute from './layouts/AdminRoute'
import AdminDashboard from './components/Main/AdminDashBoard'
import ChatBox from './components/Chat/ChatBox'
import TaskDetails from './components/Main/TaskDetail'
import Achievements from './components/Main/AchieveMent'
import User from './components/Main/User'
import AllUser from './components/Main/AllUser'


function App() {

  return (
    <AuthProvider>  
      <TaskProvider>
        <ChatProvider>

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
    <Route index element={<Dashboard/>} />
    <Route path='/main/dashboard' element={<Dashboard/>} />
    <Route path='/main/tasks/:taskId' element={<TaskDetails/>} />
    <Route path='/main/profile' element={<Profile/>} />
    <Route path='/main/chat' element={<ChatBox/>} />
    <Route path='/main/achievements' element={<Achievements/>} />
    </Route>
    <Route path="/main/admin-dashboard"  element={<AdminRoute />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path='/main/admin-dashboard/user' element={<User />} />
                  
                  <Route path='/main/admin-dashboard/alluser' element={<AllUser />} />
                  
                </Route>

    </Routes>
        </ChatProvider>
    </TaskProvider> 
    </AuthProvider>
  )
}

export default App
