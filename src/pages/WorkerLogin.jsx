import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { workerProfile } from '../redux/slice/WorkerSlice'

const WorkerLogin = () => {

    const [worker_id, setID] = useState("")
    const [role, setRole] = useState("worker")
    const [tenant, setTenant] = useState("worker")
const dispatch = useDispatch()
    const handelLogIn = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/workers/login", {
                worker_id,
                role,

                tenant
            }, {
                withCredentials: true
            }


            )

            dispatch(workerProfile(res.data.data))

           

        } catch (error) {
            toast.error("Invalid credentials")
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


                            <label className="label">Your ID</label>
                            <input
                                onChange={e => setID(e.target.value)}
                                type="email" className="input"
                                placeholder="ID"
                            />


                            <label className="label">Role</label>
                            <div className="flex items-center">
                                <input
                                    readOnly
                                    value={role}
                                    className="input flex-1"

                                />

                            </div>
                            <label className="label">Outlet Name</label>
                            <div className="flex items-center">
                                <input
                                    onChange={(e) => setTenant(e.target.value)}
                                    placeholder="Outlet Name"
                                    className="input flex-1"

                                />

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
                this is what it is
            </div>

            {/* Toast container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default WorkerLogin
