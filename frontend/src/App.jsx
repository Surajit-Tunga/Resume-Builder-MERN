import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UserProvider from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
      <Routes>
         <Route path='/' element={<Landing/>} />
      </Routes>
    </UserProvider>     
  )
}

export default App
