import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

export default function App() {

  const { authUser } = useContext(AuthContext)


  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}



