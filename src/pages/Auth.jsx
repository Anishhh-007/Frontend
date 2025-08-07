import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    
    const handelOnClick  = () =>{
        if(value === 0) {
               navigate('/auth/admin/login')
        } else{
              navigate('/workerslogin')
        }
      
        
    }

    return (
        <div className='flex flex-col justify-center h-[80vh] items-center'>
            <h1 className=''>What is Your Role?</h1>
            <div className="w-full max-w-xs">
                <input onChange={(e) => setValue(e.target.value)} type="range" min={0} max="1" value={value} className="range" step="1" />

                <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>Admin</span>
                    <span>Worker</span>

                </div>
                <div className='flex justify-center'>
                    <button onClick={handelOnClick} className="btn btn-outline btn-success">Done</button>
                </div>
            </div>
        </div>
    )
}

export default Auth
