import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login_signup/Login';
import Signup from './pages/login_signup/Signup';
import './App.css'
import Profile from './pages/profile/Profile';
import Test_creation from './pages/test-creation/Test_creation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login/test-creation' element={<Test_creation/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
