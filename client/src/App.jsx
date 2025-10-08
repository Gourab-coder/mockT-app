import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login_signup/Login';
import Signup from './pages/login_signup/Signup';
import Mock_dash from './pages/mock-dash/Mock-dash';
import Test_creation from './pages/test-creation/Test_creation';
import Test_taking from './pages/test-taking/Test_taking';
import Profile from './pages/profile/Profile';
import About from './pages/about/about';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/test-creation' element={<Test_creation/>} />
          <Route path='/test/:testId' element={<Test_taking/>} />
          <Route path='/mock-dash' element={<Mock_dash/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
