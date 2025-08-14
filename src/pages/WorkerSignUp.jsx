import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const WorkerSignUp = () => {

    const [num, setNum] = useState(1)
    const [num2, setNum2] = useState(1)
    const [status, setStatus] = useState(true)

    const [worker_id, setID] = useState("")
    const [nickname, setName] = useState("")

    const navigate = useNavigate()


    const handelOnClick = () => {
        setStatus(prev => !prev)
    }
    const handelOnClick2 = async () => {
        setNum2(num2 + 1)
        try {
            const res = await axios.post(
                "/api/workers/signup",
                {
                    worker_id,
                    nickname,
                    role: "worker"
                },
                {
                    withCredentials: true
                }
            )

           
            setName("");
            setID("");

            if (num2 == num) navigate("/")

            toast.success("A Worker Created")
        } catch (error) {
            toast.error(error.message)


        }

    }
   


    return (
        <>


            <div className="hero bg-base-200 flex flex-col items-center justify-center min-h-screen">
                <div className={`flex w-full gap-14 ${status ? '' : "hidden"} items-center justify-center`}>
                    <span className=''>How many workers should access this app?</span>
                    <div className="join">
                        <div className="join">
                            <input value={1} onClick={(e) => setNum(parseInt(e.target.value))} className={`join-item btn btn-square`} type="radio" name="options" aria-label="1" />
                            <input value={2} onClick={(e) => setNum(parseInt(e.target.value))} className={`join-item btn btn-square`} type="radio" name="options" aria-label="2" />
                            <input value={3} onClick={(e) => setNum(parseInt(e.target.value))} className={`join-item btn btn-square`} type="radio" name="options" aria-label="3" />
                            <input value={4} onClick={(e) => setNum(parseInt(e.target.value))} className={`join-item btn btn-square`} type="radio" name="options" aria-label="4" />
                        </div>

                    </div>
                    <button onClick={handelOnClick} className="btn btn-success">Done</button>

                </div>
                <div className='flex'>

                    <div className={`hero-content ${status ? "hidden" : ""} flex-col lg:flex-row-reverse`}>
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Sign Up</h1>
                            <p className="py-6">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="fieldset">
                                    <label className="label">Make unique ID for each</label>
                                    <input value={worker_id} onChange={(e) => setID(e.target.value)} type="text" className="input" placeholder="Worker ID" />

                                    <label className="label">Worker's Name</label>
                                    <input value={nickname} onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder="Name" />

                                    <label className="label">Role</label>
                                    <input  type="text" className="input" readOnly value={"worker"} />

                                    <button onClick={handelOnClick2} className="btn btn-neutral mt-4">{num2 == num ? "Sign Up" : "Next"}</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className={`steps bg-base-200 ${status ? "hidden" : ""} flex justify-center`}>
                    {Array.from({ length: num }, (_, i) => (
                        <li key={i} className={`step ${i + 1 == num2 ? "step-primary" : ""}`} />
                    ))}
                </ul>

            </div>
            {/* Toast container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default WorkerSignUp
