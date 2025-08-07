import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Adminauth = () => {
  const navigate = useNavigate()

  const [password, setPassword]   = useState("")
  const [email, setEmail]         = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName]   = useState("")
  const [tenant, setTenant]       = useState("")

  // true = show login, false = show signup
  const [isLogin, setIsLogin]     = useState(true)
  const [showPwd, setShowPwd]     = useState(false)

  const toggleForm = () => setIsLogin(prev => !prev)

  

  const handelSignUp = async () => {
    try {
      const  data  = await axios.post(
        "http://localhost:8000/admin/signup",
        { firstName, lastName, email, password, tenant },
        { withCredentials: true }
      )
      toast.success("Account created!")
      navigate("/")       // or wherever you want
    } catch (err) {
      toast.error(
        err.response?.data?.message || 
        "Signup failed. Try again."
      )
    }
  }


  return (
    <div className="hero bg-base-200 flex items-start min-h-screen">
      <div className="left w-1/2 flex pt-20 items-center justify-center">
        <div className="hero-content flex flex-col items-center w-full max-w-md px-6">
          <h1 className="text-5xl font-bold">
            {isLogin ? "Log In" : "Sign Up"}
          </h1>
          <div className="card bg-base-100 w-full shadow-2xl">
            <div className="card-body">
              {/* Only show these on SignUp */}
              {!isLogin && <>
                <label className="label">First Name</label>
                <input 
                  onChange={e => setFirstName(e.target.value)} 
                  type="text" className="input" 
                  placeholder="First Name" 
                />
                <label className="label">Last Name</label>
                <input 
                  onChange={e => setLastName(e.target.value)} 
                  type="text" className="input" 
                  placeholder="Last Name" 
                />
              </>}

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
                  type={showPwd ? "text" : "password"} 
                  className="input flex-1" 
                  placeholder="Password" 
                />
                <input 
                  type="checkbox" 
                  className="checkbox ml-2" 
                  checked={showPwd} 
                  onChange={() => setShowPwd(v => !v)} 
                />
              </div>

              {/* Only show on SignUp */}
              {!isLogin && <>
                <label className="label">Brand Name</label>
                <input 
                  onChange={e => setTenant(e.target.value)} 
                  type="text" className="input" 
                  placeholder="Brand Name" 
                />
              </>}

              {/* Toggle link */}
              <div className="flex gap-4 pt-4">
                {isLogin ? "New Here?" : "Already have an account?"}
                <button 
                  onClick={toggleForm} 
                  className="link link-hover"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </div>

              {/* Submit button with onClick on button */}
              <button 
                onClick={handleSubmit} 
                className="btn btn-neutral mt-4 w-full"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center pt-20 justify-center p-10 text-xl font-semibold">
        this is what it is
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Adminauth
