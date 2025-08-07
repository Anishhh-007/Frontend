import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './root/Layout'
import Home from './pages/Home'
import KitchenQueue from './pages/KitchenQueue'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import Adminauth from './pages/Adminauth'
import Workerauth from './pages/WorkerLogin'
import AdminSignup from './pages/AdminSignup'
import AdminLogin from './pages/AdminLogin'
import WorkerSignUp from './pages/WorkerSignUp'
import WorkerLogin from './pages/WorkerLogin'
import Auth from './pages/Auth'
import Pendingorders from './pages/PendingOrders'
import PaidOrders from './pages/PaidOrders'
import AllOrders from './pages/AllOrders'
import AdminProfile from './pages/AdminProfile'

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/orders/pending' element={<Pendingorders />} />
          <Route path='/orders/paid' element={<PaidOrders />} />
          <Route path='/orders/all' element={<AllOrders />} />
          <Route path='/kitchenqueue' element={<KitchenQueue />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/auth/admin' element = {<Adminauth />} />
          <Route path='/auth/worker' element = {<Workerauth />} />
          <Route path='/auth/admin/signup' element = {<AdminSignup />} />
          <Route path='/auth/admin/login' element = {<AdminLogin />} />
          <Route path='/workersignup' element = {<WorkerSignUp />} />
          <Route path='/workerslogin' element = {<WorkerLogin />} />
          <Route path='/authentication' element = {<Auth />} />
          <Route path='/admin/profile' element = {<AdminProfile />} />

         
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
