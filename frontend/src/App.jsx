import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UserProvider from './context/UserContext'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <UserProvider>
      <Routes>
         <Route path='/' element={<Landing/>} />
         <Route path='/dashboard'element={<Dashboard/>} />
      </Routes>
    </UserProvider>     
  )
}

export default App
