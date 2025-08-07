import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { adminProfile } from '../redux/slice/AdminProfileSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { workerProfile } from '../redux/slice/WorkerSlice'

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ✅ useSelector at top level
  const workerData = useSelector((store) => store.worker)
  const adminData = useSelector((store) => store.admin)

  const fetchAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/profile", {
        withCredentials: true
      })
      dispatch(adminProfile(res.data))
    } catch (error) {
      console.log(error)
      
    }
  }

  const fetchWorker = async () =>{
    try {
      const res = await axios.get("http://localhost:8000/worker/profile" , {withCredentials:true})

    dispatch(workerProfile(res.data))
    } catch (error) {
      console.log("ERROR" , error.message);
      
    }
  }

  useEffect(() => {
    fetchAdmin()
    fetchWorker()
  }, [])


  useEffect(() => {
    if (!adminData && !workerData ) {
      navigate("/authentication")
    } else{
      navigate('/')
    }
  }, [adminData , workerData] )

  return (
    <div>
      <Navbar />
   
        <Outlet />
      
      <Footer />
    </div>
  )
}

export default Layout
