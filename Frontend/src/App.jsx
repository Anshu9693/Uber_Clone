import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWraper from './pages/UserProtectedWraper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import { UserDataContext } from './context/UserContext.jsx'
import { CaptainDataContext } from './context/CaptainContext.jsx'
import CaptainProtectedWraper from './pages/CaptainProtectedWraper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={<UserProtectedWraper><Home/></UserProtectedWraper>} />
        <Route path='/users/logout' element={<UserProtectedWraper><UserLogout/></UserProtectedWraper>} />
        <Route path='/captain-home' element={<CaptainProtectedWraper><CaptainHome /></CaptainProtectedWraper>} />
        <Route path='/captain-logout' element={<CaptainProtectedWraper><CaptainLogout/></CaptainProtectedWraper>} />
      </Routes>
    </div>
  )
}

export default App