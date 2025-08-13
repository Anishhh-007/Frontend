import React from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { removeProfile } from '../redux/slice/AdminProfileSlice'
import { useDispatch } from 'react-redux'
import { removeWorker } from '../redux/slice/WorkerSlice'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const adminData = useSelector((store) => store.admin);
    const workerData = useSelector((store) => store.worker);
    const dispatch = useDispatch()
    const navigate = useNavigate()


  const handleLogout = async () => {
  try {
    if (adminData && Object.keys(adminData).length > 0) {
      // Admin is logged in
      const res = await axios.get("http://localhost:8000/admin/logout", {
        withCredentials: true
      });
      dispatch(removeProfile())
       navigate('/auth/admin/login')
      toast.success(res.data)
    } else if (workerData && Object.keys(workerData).length > 0) {
      // Worker is logged in
      const res = await axios.get("http://localhost:8000/worker/logout", {
        withCredentials: true
      });
      dispatch(removeWorker())
      navigate('/auth/worker/login')
      toast.success(res.data)
    } else {
      toast.error("No user is logged in")
    }
  } catch (error) {
    toast.error("Something went wrong during logout")
  }
}

    return (

        <div className="navbar bg-zinc-900  shadow-sm">
              <ToastContainer position="top-right" autoClose={3000} />
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl">ServiCo</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    <li>
                        <details>
                            <summary>Orders</summary>
                            <ul className="p-2 z-10 bg-zinc-800">
                                <li><Link to={"/orders/paid"}>Paid</Link></li>
                                <li><Link to={"/orders/pending"} >Pending</Link></li>
                                <li><Link to={"/orders/all"}>All</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link to={"/analytics"}>Analytics</Link></li>

                </ul>
            </div>
            <div className="navbar-end">
                 <span>Hello {adminData?.firstName || workerData?.nickname ||  "User"}</span>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="avatar avatar-placeholder hover:cursor-pointer">
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                           
                            <span className="text-xl">
                                {adminData?.firstName?.trim().charAt(0).toUpperCase() || workerData?.nickname?.trim().charAt(0).toUpperCase() || "U"}
                            </span>

                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li className={`${adminData ? '' : 'hidden'}`}><Link to={'/admin/profile'}>Profile</Link></li>
                        <li ><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>

            </div>
          
        </div>

    )
}

export default Navbar;
