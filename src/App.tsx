import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TicketPage from './pages/TicketPage'
import AdminPage from './pages/TeamPage'
import ErrorPage from './pages/ErrorPage'
import ProjectPage from './pages/ProjectPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import {RequireAuth} from 'react-auth-kit'
import DashboardProvider from './DashboardProvider'
import LoginProvider from './LoginProvider'
import { useState } from 'react'




function App() {
  

  return (
    <LoginProvider>  
      <DashboardProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/' element={<RequireAuth loginPath='/login'><DashboardPage/></RequireAuth>}/>
            <Route path='/dashboard' element={<RequireAuth loginPath='/login'>
                <DashboardPage />
              </RequireAuth>}/>
            <Route path='/projects' element={<RequireAuth loginPath='/login'><ProjectPage /></RequireAuth>}/>
            <Route path='/tickets' element={<RequireAuth loginPath='/login'><TicketPage /></RequireAuth>}/>
            <Route path='/team' element={<RequireAuth loginPath='/login'><AdminPage/></RequireAuth>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </Router>
      </DashboardProvider>
    </LoginProvider>
  )
}

export default App
