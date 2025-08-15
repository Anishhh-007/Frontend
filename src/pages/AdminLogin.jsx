import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { adminProfile } from '../redux/slice/AdminProfileSlice'

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [view, setView] = useState(true)
  
  const handelLogIn = async () => {
    try {
      const res = await axios.post(
        "/api/admin/login",
        { email, password },
        { withCredentials: true }
      )
      toast.success(res.data.message)
      dispatch(adminProfile(res.data.admin))
     
      
      if(res.data) navigate("/") 
      
    } catch (err) {
      // if your backend sends 401 for invalid credentials:
      if (err.response?.status === 404 || err.response?.status === 404) {
        toast.error("Invalid credentials")
      }
    }
  }



  return (
    <div className="hero bg-base-200 flex items-start min-h-screen">
      <div className="left w-1/2 flex pt-20 items-center justify-center">
        <div className="hero-content flex flex-col items-center w-full max-w-md px-6">
          <h1 className="text-5xl font-bold">
            Log In
          </h1>
          <div className="card bg-base-100 w-full shadow-2xl">
            <div className="card-body">


              <label className="label">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                type="email" className="input"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <div className="flex items-center">
                <input
                  onChange={e => setPassword(e.target.value)}
                  type={view ? "text" : "password"}
                  className="input flex-1"
                  placeholder="Password"
                />
                <input
                  type="checkbox"
                  className="checkbox ml-2"
                  checked={view}
                  onChange={() => setView(v => !v)}
                />
              </div>



              <div className="flex gap-4 pt-4">
                New Here?
                <Link to={'/auth/admin/signup'}
                  className="link link-hover"
                >
                  Sign Up
                </Link>
              </div>

              {/* Submit button with onClick on button */}
              <button
                onClick={handelLogIn}
                className="btn btn-neutral mt-4 w-full"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center pt-20 justify-center p-10 text-xl font-semibold">
        Your orders, your way — organized, easy, done.
        Clean history. Smooth delivery. Zero hassle.
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default AdminLogin
